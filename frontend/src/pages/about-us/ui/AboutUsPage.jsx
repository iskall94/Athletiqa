import { useEffect, useState } from "react";
import { AboutIntroSection } from "../../../widgets/about-intro-section";
import { AboutValuesSection } from "../../../widgets/about-values-section";
import { AboutBackGround } from "../../../shared/assets";
import { InfoHighlightBackground } from "../../../widgets/info-highlight-section";
import { BlueBackGround } from "../../../shared/assets";
import { Carousel } from "../../../shared/ui/carousel";
import { PostCard, listPosts } from "../../../enteties/post";
import { useLikePost } from "../../../features/like-post";
import { PostModal } from "../../../widgets/post-modal";
import { checkRole } from "../../../shared/lib";
import { useTranslation } from "react-i18next";

export default function AboutUsPage() {
  const { t } = useTranslation();
  const { role } = checkRole();
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const { handleToggleLike } = useLikePost();
  const isAuthenticated = Boolean(role);

  useEffect(() => {
    let ignore = false;

    async function loadPosts() {
      try {
        const postData = await listPosts();
        if (!ignore) {
          setPosts(postData.slice(0, 10));
        }
      } catch (error) {
        if (!ignore) {
          console.error(error);
        }
      }
    }

    loadPosts();

    return () => {
      ignore = true;
    };
  }, []);

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

  return (
    <main
      className="w-full overflow-x-hidden z-10"
      style={{
        backgroundImage: `url("${AboutBackGround}")`,
        backgroundSize: "100% auto",
        backgroundPosition: "center 10rem",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="relative overflow-hidden">
        <AboutIntroSection />
        <AboutValuesSection />
        <InfoHighlightBackground
          image={BlueBackGround}
          textVariant="text-accent-light"
          backgroundText={t(`"Din dröm, vårt gemensamma mål."`)}
          underText={t("Vill du vara med på resan? Oavsett om du är en ung idrottare redo att ta nästa kliv, en förälder som vill stötta, eller ett företag som vill investera i nästa generation – välkommen till Athletiqa!")}
          underTextVariant="text-primary"
        />
      </section>

      {/* De som redan fått hjälp — posts carousel (mirrors HomePage) */}
      <section className="py-12 mt-12 md:mt-20 lg:mt-[20rem] relative overflow-visible">
        <div className="w-full max-w-[109rem] mx-auto px-4 md:px-8 lg:px-[3.25rem]">
          <div className="relative z-10 mt-6 md:mt-12 lg:mt-[10rem]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight lg:leading-[4rem] mb-6 md:mb-8 lg:mb-[3rem]">
              {t("De som redan fått hjälp")}
            </h2>

            <Carousel>
              {posts.map((post) => (
                <div
                  key={post.postId ?? post.id}
                  className="flex-shrink-0 w-[18rem] sm:w-[20rem] md:w-[23.5rem]"
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

      {activePost && (
        <PostModal
          post={activePost}
          isOpen={true}
          onClose={() => setActivePost(null)}
          onToggleLike={handlePostLikeToggle}
          isAuthenticated={isAuthenticated}
        />
      )}
    </main>
  );
}
