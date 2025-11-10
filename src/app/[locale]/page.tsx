import TodoFormPage from "@/components/TodoFormPage/TodoFormPage";
import TodoListSection from "@/components/TodoFormPage/TodoListSection";
import LogoutButton from "@/components/MainButtons/LogoutButton";

export default function TodoPage() {
  return (
    <div className="min-h-screen py-10 bg-gray-50">
      <div className="absolute top-4 right-4">
        <LogoutButton />
      </div>
      <TodoFormPage />
      <TodoListSection />
    </div>
  );
}
