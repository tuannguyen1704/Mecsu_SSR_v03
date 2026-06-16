import { HOME_BEST_DEALS } from "../data/home-best-deals";
import { HomeBestDealsClient } from "./HomeBestDealsClient";

export function HomeBestDeals() {
  return (
    <section className="bg-white pt-1 pb-2 font-sans">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <HomeBestDealsClient products={HOME_BEST_DEALS} />
      </div>
    </section>
  );
}
