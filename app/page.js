import Countdown from "./_components/CountDown";
import Showcase from "./_components/Showcase";

export default function Home() {
  return (
    <main>
      <Showcase />
      <div className="mt-10">
        <Countdown hours={25} />
      </div>
    </main>
  );
}
