'use client';

import { startTransition } from "react";
import { removeOne } from "./actions";

export default function MutateButton() {
  return (
    <button
      onClick={() => removeOne()}
      className="w-96 h-12 px-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
    >
      Mutate S3 data
    </button>
  );
}