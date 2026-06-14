import { useState } from 'react';
import { Form } from 'react-router-dom';
import { useSearchParams } from "react-router"
import { PostFeed } from '../../../widgets/post-feed';
import { CampaignList } from '../../../widgets/campaign-list';
import { PostModal } from '../../../widgets/post-modal';
import Button from '../../../shared/ui/button/Button';
import Input from '../../../shared/ui/input/Input';
import ExploreVector from '../../../shared/assets/explore-vector.svg?url';

// testing create forms, will be moved to separate pages later
import { CreatePostForm } from '../../../features/create-post';
import { CreateCampaignForm } from '../../../features/create-campaign';
import { useLikePost } from '../../../features/like-post';
import { useCurrentUser } from '../../../shared/lib/useCurrentUser';
import { useTranslation } from 'react-i18next';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [activePost, setActivePost] = useState(null);
  const [testMode, setTestMode] = useState(null); // 'post', 'campaign', or null
  const [postFeedRefreshKey, setPostFeedRefreshKey] = useState(0); // Key to force refresh of PostFeed after creating a post
  const [campaignRefreshKey, setCampaignRefreshKey] = useState(0); // Key to force refresh of CampaignList after creating a campaign
  // use searchParams to get searchPost
  const [searchParams] = useSearchParams();
  const currentSearchTerm = searchParams.get('searchPosts') || '';
  const { t } = useTranslation();
  const { handleToggleLike } = useLikePost();
  const { currentUser } = useCurrentUser();
  const isAuthenticated = Boolean(currentUser);

  const container = "w-full max-w-[109rem] mx-auto px-[3.25rem]";

  const handlePostLikeToggle = async (postId, isLiked) => {
    try {
      const result = await handleToggleLike(postId, isLiked);

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
      style={{
        backgroundImage: `url("${ExploreVector}")`,
        backgroundSize: '100% auto',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center -12rem'
      }}
      className="bg-bg min-h-screen w-full px-4 pt-24 pb-12 relative overflow-x-hidden">
      {/* <h1 className="sr-only">Explore Page</h1> */}
      {/* Temporary debug section for create forms */}
      {/* <div>
        <h3>Debug: Create Content</h3>
        <Button onClick={() => setTestMode('post')}>Test Post</Button>
        <Button onClick={() => setTestMode('campaign')}>Test Campaign</Button>
        <Button onClick={() => setTestMode(null)}>Hide Forms</Button>

        <div>
          {testMode === 'post' && (
            <CreatePostForm onPostCreated={() => {
              setTestMode(null);
              setPostFeedRefreshKey((current) => current + 1);
            }} />
          )}
          {testMode === 'campaign' && (
            <CreateCampaignForm onCampaignCreated={() => {
              setTestMode(null);
              setCampaignRefreshKey((current) => current + 1);
            }} />
          )}
        </div>
      </div> */}

      {/* Tab navigation */}
      <div className={`${container} w-full max-w-[44rem] mx-auto mt-2 mb-4 z-10 relative`}>
        <nav className="flex justify-center w-full border-b-2 border-gray-100 max-w-[13rem] mx-auto">
          <button onClick={() => setActiveTab('donations')}
            className={`pb-3 px-6 font-heading font-medium text-base transition-all border-b-2 -mb-[0.125rem] cursor-pointer ${
              activeTab === 'donations'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:border-gray-700'
            }`}
          >
          {t('Donation')}
          </button>
        <button onClick={() => setActiveTab('posts')}
        className={`pb-3 px-6 font-heading font-medium text-base transition-all border-b-2 -mb-[0.125rem] cursor-pointer ${
            activeTab === 'posts' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {t('Inlägg')}
        </button>
      </nav>
      </div>
      {/* Search form */}
      <div className={`${container} mb-8 z-10 relative`}>
        <Form method='get' className="flex w-full md:w-[70%] max-w-[54rem] mx-auto gap-2">
          <Input
            name="searchPosts" 
            id="searchPosts"
            autoComplete="off"
            placeholder={t('Sök....')} 
            className="w-full py-4 pl-6 pr-6 rounded-full border border-gray-100 bg-bg focus:outline-none placeholder-gray-500 text-gray-700 " />
        </Form>
      </div>

      {/* Render the correct widget based on the tab */}
      <section className={`${container} z-10 relative min-h-[70vh]`}>
        {activeTab === 'posts' && <PostFeed searchTerm={currentSearchTerm} onPostOpen={setActivePost} key={postFeedRefreshKey} />} {/* Pass refresh key to force remount and re-fetch posts after creating a new post */}{/*pass searchterm as a prop*/}
        {activeTab === 'donations' && <CampaignList key={campaignRefreshKey} />} {/* Pass refresh key to force remount and re-fetch campaigns after creating a new campaign */}
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