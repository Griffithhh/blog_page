'use client';

import { useTodoStore } from "../../../store/todoStore";
import { Card, CardHeader, CardBody, Button, Divider } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TodoListSection() {
  const t = useTranslations();
  const { todos, removeTodo, clearTodos } = useTodoStore();

  if (todos.length === 0) {
    return (
      <Card className="max-w-md mx-auto mt-8 p-6 text-center shadow-md">
        <CardBody>
          <p className="text-gray-500">{t('no_todos')}</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t('todo_list')}</h2>
        <Button color="danger" variant="light" onPress={clearTodos}>
          {t('clear_all')}
        </Button>
      </CardHeader>

      <Divider />

      <CardBody className="flex flex-col gap-3">
        {todos.map((todo, index) => (
          <Card
            key={index}
            className="border border-default-200 hover:shadow-md transition-shadow duration-200"
          >
            <CardHeader className="flex justify-between items-center">
              <h3 className="font-semibold">{todo.title}</h3>
              <Button
                isIconOnly
                size="sm"
                color="danger"
                variant="light"
                onPress={() => removeTodo(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            {todo.description && (
              <CardBody className="text-sm text-gray-600">
                {todo.description}
              </CardBody>
            )}
          </Card>
        ))}
      </CardBody>
    </Card>
  );
}
