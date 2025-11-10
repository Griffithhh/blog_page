"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Textarea,
} from "@heroui/react";
import { useTranslations } from "next-intl";

import { addBlog } from "@/lib/api";

type BlogFormData = {
  title: string;
  content: string;
};

export default function BlogForm() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<BlogFormData>();

  const mutation = useMutation({
    mutationFn: addBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      reset();
    },
  });

  const onSubmit = (data: BlogFormData) => {
    console.log("Submitting blog:", data);
    mutation.mutate(data);
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-md">
      <CardHeader className="text-xl font-semibold">{t("add_blog")}</CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={t("title")}
            {...register("title", { required: true })}
          />
          <Textarea
            label={t("content")}
            {...register("content", { required: true })}
          />
          <Button color="danger" isLoading={mutation.isPending} type="submit">
            {t("submit")}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
