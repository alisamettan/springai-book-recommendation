"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowToast(true);
      setTimeout(() => {
        router.push("/login");
      });
    } else {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (showToast) {
      toast.info("You need to log in!", {
        autoClose: 1000,
        position: "top-center",
      });
    }
  });

  return <>{children}</>;
};

export default PrivateRoute;
