import Image from "next/image";
import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";
import blog3 from "../assets/blog3.png";
import blog4 from "../assets/blog4.png";
import Link from "next/link";

const articles = [
  {
    title: "How grocers are approaching delivery as the market evolves",
    image: blog1,
    description:
      "Bilmalvakt tresskade i nibel den mobilmissbruk deren jyn nöning osk heterostik i rel ultran. Fälass",
    author: "sinan",
    date: "3 Nov 2023",
  },
  {
    title: "The Friday Checkout: Food insecurity keeps retailers off balance",
    image: blog2,
    description:
      "Bilmalvakt tresskade i nibel den mobilmissbruk deren jyn nöning osk heterostik i rel ultran. Fälass",
    author: "sinan",
    date: "3 Nov 2023",
  },
  {
    title: "Consumer want grocer to use AI to help them save money Dunnhumby",
    image: blog3,
    description:
      "Bilmalvakt tresskade i nibel den mobilmissbruk deren jyn nöning osk heterostik i rel ultran. Fälass",
    author: "sinan",
    date: "3 Nov 2023",
  },
  {
    title:
      "Order up! How grocers are replicating the restaurant experience in retail",
    image: blog4,
    description:
      "Bilmalvakt tresskade i nibel den mobilmissbruk deren jyn nöning osk heterostik i rel ultran. Fälass",
    author: "sinan",
    date: "3 Nov 2023",
  },
];

export default function Blogs() {
  return (
    <section className="container pb-10 mx-auto">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4 md:gap-0">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-[18px] font-bold text-[#030712]">Our News</h2>
          <p className="text-[13px] text-[#9CA3AF]">
            Some of the new posts this week
          </p>
        </div>
        <button className="text-[12px] cursor-pointer font-semibold text-[#000] border border-[#E5E7EB] rounded-full px-4 py-2 flex items-center gap-2 hover:gap-3 hover:text-[#fff] hover:bg-[#634C9F] transition-all duration-300">
          View All{" "}
          <svg
            width="14"
            height="6"
            viewBox="0 0 14 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3956 2.81796C13.3956 2.78996 13.3839 2.76429 13.3606 2.74096C13.3372 2.71762 13.3116 2.70596 13.2836 2.70596L10.9456 0.367957C10.8522 0.283957 10.7449 0.241957 10.6236 0.241957C10.5022 0.241957 10.3949 0.283957 10.3016 0.367957C10.2082 0.451957 10.1639 0.55929 10.1686 0.689957C10.1732 0.820623 10.2176 0.927957 10.3016 1.01196L11.8836 2.59396H1.31356C1.19223 2.59396 1.0849 2.63596 0.991563 2.71996C0.898229 2.80396 0.851562 2.91829 0.851562 3.06296C0.851562 3.20762 0.893563 3.31962 0.977563 3.39896C1.06156 3.47829 1.17356 3.51796 1.31356 3.51796H11.9396L10.3576 5.09996C10.2736 5.18396 10.2316 5.28896 10.2316 5.41496C10.2316 5.54096 10.2736 5.65062 10.3576 5.74396C10.3856 5.77196 10.4276 5.79762 10.4836 5.82096C10.5396 5.84429 10.5956 5.85596 10.6516 5.85596C10.7076 5.85596 10.7636 5.84429 10.8196 5.82096C10.8756 5.79762 10.9176 5.77196 10.9456 5.74396L13.2836 3.40596C13.3022 3.38729 13.3209 3.36396 13.3396 3.33596C13.3582 3.30796 13.3769 3.29396 13.3956 3.29396C13.4236 3.17262 13.4376 3.07929 13.4376 3.01396C13.4376 2.94862 13.4236 2.88329 13.3956 2.81796Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article, idx) => (
          <div key={idx} className="overflow-hidden bg-white flex flex-col">
            <div className="relative w-full h-[219px] rounded-[24px]">
              <Image
                src={article.image.src}
                alt={article.title}
                layout="fill"
                objectFit="cover "
              />
              <span className="absolute top-3 left-3 bg-white text-[#634C9F] text-[11px] font-bold px-2 py-1 rounded-[6px]">
                UNCATEGORIZED
              </span>
            </div>
            <div className="flex flex-col flex-grow mt-5">
              <Link
                href="/"
                className="text-[17px] cursor-pointer text-[#030712] font-bold hover:text-[#634C9F] duration-300 transition-all mb-2 leading-tight"
              >
                {article.title}
              </Link>
              <p className="text-[#4B5563] text-[13px] flex-grow">
                {article.description}
              </p>
              <div className="flex items-center gap-2 mt-4 ">
                <div className="flex items-center gap-1">
                  <span className="text-[12px] text-[#6B7280] italic">by</span>
                  <span className="text-[12px] text-[#374151] font-semibold">
                    {article.author}
                  </span>
                </div>
                <span className="text-[12px] text-[#374151] font-normal">
                  {" "}
                  - {article.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
