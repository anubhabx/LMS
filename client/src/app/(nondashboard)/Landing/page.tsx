"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";

const LoadingSkeleton = () => {
  return (
    <div className="landing-skeleton">
      <div className="landing-skeleton__hero">
        <div className="landing-skeleton__hero-content">
          <Skeleton className="landing-skeleton__title"></Skeleton>
          <Skeleton className="landing-skeleton__subtitle"></Skeleton>
          <Skeleton className="landing-skeleton__subtitle-secondary"></Skeleton>
          <Skeleton className="landing-skeleton__button"></Skeleton>
        </div>
        <Skeleton className="landing-skeleton__hero-image" />
      </div>

      <div className="landing-skeleton__featured">
        <Skeleton className="landing-skeleton__featured-title" />
        <Skeleton className="landing-skeleton__featured-description" />

        <div className="landing-skeleton__tags">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="landing-skeleton__tag" />
          ))}
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const currentImage = useCarousel({ totalImages: 3 });
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});
  console.log("Courses", courses);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing"
    >
      <motion.div
        className="landing__hero"
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="landing__hero-content">
          <h1 className="landing__title">Lorem ipsum dolor sit amet.</h1>
          <p className="landing__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas non
            labore.
          </p>

          <div className="landing__cta">
            <Link href="/search">
              <Button className="landing__cta-button">
                Search for courses
              </Button>
            </Link>
          </div>
        </div>

        <div className="landing__hero-images">
          {["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"].map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="hero image"
              fill
              className={`landing__hero-image ${index === currentImage ? "landing__hero-image--active" : ""}`}
              priority={currentImage === index}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px), 50vw, 33vw"
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="landing__featured"
      >
        <h2 className="landing__featured-title">Lorem ipsum dolor.</h2>
        <p className="landing__featured-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
          accusamus. Repellat est placeat id perferendis optio minus
          voluptatibus, in veritatis, quos vel et dolores assumenda? Commodi
          laborum veritatis hic quisquam!
        </p>

        <div className="landing__tags">
          {[
            "Web Development",
            "Mobile Development",
            "Data Science",
            "Machine Learning",
            "Artificial Intelligence",
            "UI/UX Design",
          ].map((tag, index) => (
            <span key={index} className="landing__tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="landing__courses"></div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
