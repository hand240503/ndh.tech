import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import HomeClientView from "@/components/HomeClientView";

export const metadata = {
  title: "root@portfolio — Systems Administrator",
  description: "Ghi chép hành trình học Network & DevOps, vận hành hệ thống và lab cá nhân.",
};

export default function HomePage() {
  const posts = getAllPosts();
  const projects = getAllProjects();

  return <HomeClientView posts={posts} projects={projects} />;
}
