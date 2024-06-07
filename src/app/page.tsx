import Image from "next/image";
import Visualizer from "./components/Visualizer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Visualizer/>
    </main>
  );
}
