import { useLoaderData as useLoaderDataOriginal } from "react-router-dom";
/**
 * Returns the loader data for the nearest ancestor Route loader
 *
 * __refined__: enabled type assertion using generic type syntax
 */
export const useLoaderData = <T>() => useLoaderDataOriginal() as T;
