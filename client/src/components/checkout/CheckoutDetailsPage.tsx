"use client";

import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import { useSearchParams } from "next/navigation";
import React from "react";
import Loading from "../shared/Loading";

const CheckoutDetailsPage = () => {
  const { course: selectedCourse, isLoading, isError } = useCurrentCourse();
  const searchParams = useSearchParams();
  const showSignUp = searchParams.get("ShowSignUp") === "true";

  if (isLoading) return <Loading />;
  if (isError) return <div>Failed to load course</div>;
  if (!selectedCourse) return <div>Course not found</div>;

  return (
    <div className="checkout-details">
      <div className="checkout-details__container">
        <div className="checkout-details__preview"></div>
      </div>
    </div>
  );
};

export default CheckoutDetailsPage;
