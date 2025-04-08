import BookmarkComponent from '@/features/job/bookmark-component';
import JobPostingCard from '@/features/job/job-posting-card';
const JobPage = () => {
  return (
    <div>
      JobPage
      <JobPostingCard />
      <BookmarkComponent jobPostingId={1} />
    </div>
  );
};

export default JobPage;
