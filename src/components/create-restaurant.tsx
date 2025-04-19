"use client";

import React from "react";
import { useRestaurantForm } from "@/hooks/useRestaurantForm";
import FormGenerator from "@/components/form-generator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CreateRestaurant = () => {
  const { errors, onFormSubmit, register } = useRestaurantForm();
  return (
    <div className={"flex items-center h-screen justify-center"}>
      <Card className={"text-white border-gray-600 bg-black w-[30%]"}>
        <CardHeader>
          <CardTitle className="text-2xl">Create Restaurant</CardTitle>
          <CardDescription>
            Enter your details below to create your Restaurant
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              name={"address"}
              errors={errors}
              placeholder={"address"}
              type={"text"}
              label={"address"}
            />
            <FormGenerator
              inputType={"input"}
              register={register}
              name={"cuisine"}
              errors={errors}
              placeholder={"cuisine"}
              type={"text"}
              label={"cuisine"}
            />
            <FormGenerator
              inputType={"input"}
              register={register}
              name={"image_url"}
              errors={errors}
              placeholder={"image"}
              type={"text"}
              label={"image"}
            />
            <Button className={"bg-white text-black mt-6"}>Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRestaurant;
