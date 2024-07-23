// src/app/document/page.js
"use client";

import React, { useState, useEffect } from "react";
import ReactSwagger from "./react-swagger";

const SwaggerPage = () => {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    const fetchSpec = async () => {
      const response = await fetch("/api/swagger");
      const data = await response.json();
      setSpec(data);
    };
    fetchSpec();
  }, []);

  if (!spec) return <div>Loading...</div>;

  return <ReactSwagger spec={spec} />;
};

export default SwaggerPage;
