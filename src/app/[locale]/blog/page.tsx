import BlogList from "@/components/Blog/BlogList";
import BlogForm from "@/components/Blog/BlogForm";

export default function BlogPage() {
  return (
    <main className="min-h-screen py-10 bg-gray-50">
      <BlogForm />
      <BlogList />
    </main>
  );
}
