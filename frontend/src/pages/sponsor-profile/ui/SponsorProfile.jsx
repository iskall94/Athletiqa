import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import LoggedInSponsorProfile from "./LoggedInSponsorProfile";
import PublicSponsorProfile from "./PublicSponsorProfile";
import { getSponsorMedals } from "../../../enteties/medal";
import { useCurrentUser } from "../../../shared/lib/useCurrentUser";
import {
  getMySponsorDonations,
  getPublicSponsorDonations,
  getPublicSponsorProfile,
} from "../../../shared/api";
import { getSponsorProfile } from "../../../features/update-settings";
import { useTranslation } from "react-i18next";

// Page width used across this whole screen.
export const container = "w-full max-w-[109rem] mx-auto px-[3.25rem]";

export default function SponsorProfile() {
  const { id } = useParams();
  const { currentUser, isLoading } = useCurrentUser();
  const { t } = useTranslation();
  const [sponsor, setSponsor] = useState(null);
  const [activeDonations, setActiveDonations] = useState([]);
  const [finishedDonations, setFinishedDonations] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [publicSponsor, setPublicSponsor] = useState(null);
  const [publicDonations, setPublicDonations] = useState([]);
  const [isPublicProfileLoading, setIsPublicProfileLoading] = useState(false);
  const [publicProfileError, setPublicProfileError] = useState(null);

  useEffect(() => {
    if (!id) return;

    let ignore = false;

    async function loadPublicSponsorProfile() {
      setIsPublicProfileLoading(true);
      setPublicProfileError(null);

      try {
        const [profile, donations] = await Promise.all([
          getPublicSponsorProfile(id),
          getPublicSponsorDonations(id),
        ]);

        if (!ignore) {
          setPublicSponsor(profile);
          setPublicDonations(donations.map(mapSponsorDonationFromApi));
        }
      } catch (error) {
        if (!ignore) {
          setPublicProfileError(error);
        }
      } finally {
        if (!ignore) {
          setIsPublicProfileLoading(false);
        }
      }
    }

    loadPublicSponsorProfile();

    return () => {
      ignore = true;
    };
  }, [id]);

  useEffect(() => {
    if (id || isLoading) return;

    if (!currentUser) {
      setProfileLoading(false);
      return;
    }

    let ignore = false;

    async function loadLoggedInSponsorProfile() {
      setProfileLoading(true);
      setProfileError(null);

      try {
        const [profileData, donationsData] = await Promise.all([
          getSponsorProfile(),
          getMySponsorDonations(),
        ]);

        if (!ignore) {
          setSponsor({
            userId: currentUser.userId,
            name: profileData.companyName || "Okänd sponsor",
            photoUrl: profileData.photoUrl ?? "",
            description: profileData.description ?? "",
            sports: [],
            followers: 0,
          });

          const donations = donationsData.map(mapSponsorDonationFromApi);

          setActiveDonations(
            donations.filter(
              (donation) =>
                donation.campaign.currentAmount < donation.campaign.goalAmount,
            ),
          );

          setFinishedDonations(
            donations.filter(
              (donation) =>
                donation.campaign.currentAmount >= donation.campaign.goalAmount,
            ),
          );
        }
      } catch (error) {
        if (!ignore) {
          setProfileError(error);
        }
      } finally {
        if (!ignore) {
          setProfileLoading(false);
        }
      }
    }

    loadLoggedInSponsorProfile();

    return () => {
      ignore = true;
    };
  }, [currentUser, id, isLoading]);

  const donations = [...activeDonations, ...finishedDonations];
  const medalDonationCount = id ? publicDonations.length : donations.length;
  const medals = getSponsorMedals(medalDonationCount);

  const isOwnProfile =
    Boolean(currentUser) && (!id || currentUser.userId === id);
  const isAuthenticated = Boolean(currentUser);

  const publicProfileSponsor = publicSponsor
    ? {
        ...publicSponsor,
        quote: publicSponsor.description,
        sports: [],
        bioPoints: [],
      }
    : sponsor;

  if (
    isLoading ||
    profileLoading ||
    isPublicProfileLoading ||
    (id && !publicSponsor && !publicProfileError)
  ) {
    return (
      <div className="min-h-screen flex flex-col bg-bg">
        <main className={`${container} flex-1 pt-8`}>{t("Laddar profil...")}</main>
      </div>
    );
  }

  if (!id && !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!id && profileError) {
    return (
      <div className="min-h-screen flex flex-col bg-bg">
        <main className={`${container} flex-1 pt-8`}>
          Kunde inte ladda profilen.
        </main>
      </div>
    );
  }

  if (!id && !sponsor) {
    return null;
  }

  if (id && !publicProfileSponsor) {
    return null;
  }

  if (id && publicProfileError) {
    return (
      <div className="min-h-screen flex flex-col bg-bg">
        <main className={`${container} flex-1 pt-8`}>
          Kunde inte ladda profilen.
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <main className="flex-1 flex flex-col">
        {/* Breadcrumb */}
        <nav
          className={`${container} pt-8 flex items-center gap-2 text-sm text-gray-700`}
        >
          <Link to="/" className="hover:underline">
            {t("Start")}
          </Link>
          <span>/</span>
          <Link to="/explore" className="hover:underline">
            {t("Utforska")}
          </Link>
          <span>/</span>
          <span>{isOwnProfile ? sponsor.name : publicProfileSponsor.name}</span>
        </nav>

        {/* Pick own or public profile based on the logged in user. */}
        {isOwnProfile ? (
          <LoggedInSponsorProfile
            container={container}
            sponsor={sponsor}
            medals={medals}
            activeDonations={activeDonations}
            finishedDonations={finishedDonations}
          />
        ) : (
          <PublicSponsorProfile
            container={container}
            sponsor={publicProfileSponsor}
            medals={medals}
            donations={publicDonations}
            isAuthenticated={isAuthenticated}
          />
        )}
      </main>
    </div>
  );
}

function mapSponsorDonationFromApi(donation) {
  return {
    donationId: donation.donationId,
    amount: Number(donation.amount),
    createdAt: donation.createdAt,
    campaign: {
      campaignId: String(donation.campaignId),
      athleteId: donation.athletePublicProfileId,
      title: donation.campaignTitle,
      content: donation.campaignContent,
      athleteName: donation.athleteName,
      goalAmount: Number(donation.campaignGoalAmount),
      currentAmount: Number(donation.campaignCurrentAmount),
      mediaUrl: donation.campaignMediaUrl,
      resourceType: donation.campaignMediaResourceType,
      donationAmount: Number(donation.amount),
      athletePhotoUrl: donation.athletePhotoUrl,
      athleteGender: donation.athleteGender,
      createdAt: donation.createdAt,
    },
  };
}
