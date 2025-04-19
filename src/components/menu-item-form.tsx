"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAddMenuItem } from "@/hooks/useAddMenuItem";
import FormGenerator from "./form-generator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MenuItemForm({ menuId }: { menuId: string }) {
  const { errors, onFormSubmit, register, isPending } = useAddMenuItem();

  return (
    <Dialog>
      <DialogTrigger>Create</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Add Menu Item</CardTitle>
            <CardDescription>
              Add a new item to your restaurant menu
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <form onSubmit={onFormSubmit} className="space-y-4"> */}
            <form onSubmit={onFormSubmit} className={"flex flex-col gap-y-2"}>
              <FormGenerator
                inputType={"input"}
                register={register}
                name={"name"}
                errors={errors}
                placeholder={"name"}
                type={"text"}
                label={"name"}
              />
              <FormGenerator
                inputType={"input"}
                register={register}
                name={"price"}
                errors={errors}
                placeholder={"price"}
                type={"text"}
                label={"price"}
              />
              <FormGenerator
                inputType={"input"}
                register={register}
                name={"imageUrl"}
                errors={errors}
                placeholder={"imageUrl"}
                type={"text"}
                label={"imageUrl"}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Adding..." : "Add Menu Item"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
