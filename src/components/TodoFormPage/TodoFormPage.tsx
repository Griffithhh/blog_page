'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Card, CardBody, CardHeader, Input, Button } from "@heroui/react";
import {useTodoStore} from "../../../store/todoStore";


type TodoFormData = {
  title: string;
  description: string;
};

export default function TodoFormPage() {
  const t = useTranslations();
  const addTodo = useTodoStore((state) => state.addTodo);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TodoFormData>();

  const onSubmit = (data: TodoFormData) => {
    addTodo(data);
    reset();
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg">
      <CardHeader className="text-xl font-semibold">{t('add_todo')}</CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label={t('title')}
            {...register('title', { required: t('title_required') })}
            isInvalid={!!errors.title}
            errorMessage={errors.title?.message}
          />
          <Input
            label={t  ('description')}
            {...register('description')}
          />
          <Button  color="danger"  type="submit">{t('submit')}</Button>
        </form>
      </CardBody>
    </Card>
  );
}
