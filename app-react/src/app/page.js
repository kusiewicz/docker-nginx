"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const CurrentTime = (props) => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: [props.api],
    queryFn: () => axios.get(`${props.api}`).then((res) => res.data),
  });

  if (isLoading) return `Loading ${props.api}... `;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="App">
      <p>---</p>
      <p>API: {data.api}</p>
      <p>Time from DB: {data.now}</p>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
};

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Hi!</h1>
      <CurrentTime api="/api/python/" />
      <CurrentTime api="/api/node/" />
    </QueryClientProvider>
  );
}
