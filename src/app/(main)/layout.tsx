import Followbar from "@/components/layout/followBar/FollowBar";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Grid from "@/components/shared/Grid";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Grid>
      <Sidebar />
      {children}
      <Followbar />
    </Grid>
  );
}
