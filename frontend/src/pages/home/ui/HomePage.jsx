import { useEffect, useState } from "react";
import { Carousel } from "../../../shared/ui/carousel";
import scrollbarVector from "../../../shared/assets/scrollbar-vector.svg?url";
import ballsBackGround from "../../../shared/assets/balls-background.svg?url";
import { FaqSection } from "../../../widgets/faq-section";
import HowItWorkSection from "../../../widgets/how-it-works-section";
import LandingHero from "../../../widgets/landing-hero";
import DashboardHero from "../../../widgets/dashboard-hero";
import { CampaignCard, listCampaigns } from "../../../enteties/campaign";
import { AthleteCard, listFeaturedAthletes } from "../../../enteties/athlete";
import { PostCard, listPosts } from "../../../enteties/post";
import { useLikePost } from "../../../features/like-post";
import { PostModal } from "../../../widgets/post-modal";
import { useTranslation } from "react-i18next";
import { checkRole } from "../../../shared/lib";
import {
  getAthleteProfile,
  getSponsorProfile,
} from "../../../features/update-settings";

const carouselContainer = "w-full max-w-[109rem] mx-auto px-[3.25rem]";

export default function HomePage() {
  const { role, loading } = checkRole();
  const { t } = useTranslation();
  const [athletes, setAthletes] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [isDisplayNameLoading, setIsDisplayNameLoading] = useState(false);
  const { handleToggleLike } = useLikePost();

  const isAuthenticated = Boolean(role);

  useEffect(() => {
    let ignore = false;

    async function loadHomeCards() {
      try {
        const [athleteData, campaignData, postData] = await Promise.all([
          listFeaturedAthletes(),
          listCampaigns(),
          listPosts(),
        ]);

        if (ignore) {
          return;
        }

        setAthletes(athleteData.slice(0, 10));

        setCampaigns(
          campaignData
            .filter((campaign) => campaign.currentAmount < campaign.goalAmount)
            .slice(0, 5),
        );

        setPosts(postData.slice(0, 10));
      } catch (error) {
        if (!ignore) {
          console.error(error);
        }
      }
    }

    loadHomeCards();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (loading || !role) {
      setDisplayName("");
      setIsDisplayNameLoading(false);
      return;
    }

    let ignore = false;

    async function loadDisplayName() {
      setIsDisplayNameLoading(true);

      try {
        const isSponsor =
          role === "SponsorUser" || role === "SponsorCompanyUser";

        const profile = isSponsor
          ? await getSponsorProfile()
          : await getAthleteProfile();

        if (ignore) {
          return;
        }

        const name = isSponsor
          ? profile.companyName
          : `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim();

        setDisplayName(name ?? "");
      } catch (error) {
        if (!ignore) {
          console.error("Failed to load dashboard display name", error);
          setDisplayName("");
        }
      } finally {
        if (!ignore) {
          setIsDisplayNameLoading(false);
        }
      }
    }

    loadDisplayName();

    return () => {
      ignore = true;
    };
  }, [loading, role]);

  const handlePostLikeToggle = async (postId, isLiked) => {
    try {
      const result = await handleToggleLike(postId, isLiked);

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          (post.postId ?? post.id) === result.postId
            ? {
                ...post,
                likes: result.likeCount,
                isLiked: result.isLiked,
              }
            : post,
        ),
      );

      setActivePost((currentPost) =>
        (currentPost?.postId ?? currentPost?.id) === result.postId
          ? {
              ...currentPost,
              likes: result.likeCount,
              isLiked: result.isLiked,
            }
          : currentPost,
      );
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  const user = {
    name: displayName,
    role: role,
    donationCount: 3,
  };

  if (loading || isDisplayNameLoading) {
    return null;
  }

  return (
    <div className="w-full overflow-x-hidden bg-bg">
      {/* Load correct Hero depending on role */}
      {role === null || role === undefined ? (
        <LandingHero />
      ) : (
        <DashboardHero user={user} />
      )}

      <div className="relative">
        <div
          style={{
            backgroundImage: `url("${scrollbarVector}")`,
          }}
          className="absolute inset-x-0 top-0 pointer-events-none z-0
          h-[110rem] bg-no-repeat bg-[length:100%_auto] bg-[position:center_0rem]"
        />
        <div
          style={{
            backgroundImage: `url("${ballsBackGround}")`,
          }}
          className="absolute inset-x-0 top-0 w-full pointer-events-none z-0
            h-[100rem] bg-no-repeat bg-[length:100%_auto] bg-[position:center_70rem]"
        />
      </div>

      {/* Global homepage carousels */}
      <>
        {/* Våra atleter */}
        <section className="py-12 relative overflow-hidden">
          <div className={carouselContainer}>
            <div className="relative z-10">
              <h2 className="text-5xl font-extrabold text-primary mb-6 leading-[4rem]">
                {t("Våra atleter")}
              </h2>

              {/*   
                Horizontal scrolling row of athlete cards.
                Each card uses real athlete profile data from the backend. 
              */}
              <Carousel>
                {athletes.map((athlete) => (
                  <AthleteCard
                    key={athlete.publicProfileId}
                    athlete={athlete}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </section>

        {/* Vad de behöver */}
        <section className="py-12 z-10 relative overflow-hidden">
          <div className={carouselContainer}>
            <h2 className="text-2xl font-bold text-primary mb-6">
              {t("Vad de behöver")}
            </h2>

            {/* Horizontal scrolling row of active campaigns.
                Each card keeps the shared campaign card behaviour and navigation. */}
            <Carousel>
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.campaignId}
                  campaign={campaign}
                  className="flex-shrink-0 w-full max-w-[48rem]"
                />
              ))}
            </Carousel>
          </div>
        </section>
      </>

      <HowItWorkSection />

      {/* De som redan fick hjälp — posts carousel */}
      <section className="py-15 mt-[20rem] relative overflow-visible">
        <div className={carouselContainer}>
          <div className="relative z-10 mt-[10rem]">
            <h2 className="text-5xl font-extrabold text-primary leading-[4rem ] mb-[3rem]">
              {t("De som redan fått hjälp")}
            </h2>

            {/* Post cards from real backend data. */}
            <Carousel>
              {posts.map((post) => (
                <div
                  key={post.postId ?? post.id}
                  className="flex-shrink-0 w-[23.5rem]"
                >
                  <PostCard
                    post={post}
                    onOpen={() => setActivePost(post)}
                    onToggleLike={handlePostLikeToggle}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* FAQ — big heading left, accordion right */}
      <FaqSection />

      {activePost && (
        <PostModal
          post={activePost}
          isOpen={true}
          onClose={() => setActivePost(null)}
          onToggleLike={handlePostLikeToggle}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
}
