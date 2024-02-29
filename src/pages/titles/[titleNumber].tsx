import { useRouter } from "next/router";
import MainLayout from "~/components/MainLayout";
import MapWrapper from "~/components/MapWrapper";

import { api } from "~/utils/api";
import { cn } from "~/utils/helpers";

export default function TitleDetail() {
  const router = useRouter();
  const titleNumber = router.query.titleNumber as string | undefined;

  const { data } = api.title.get.useQuery({ titleNumber: titleNumber ?? "" }, {
    enabled: !!titleNumber,
  });

  return (
    <MainLayout>
      <div>
        {data ? (
          <div className="flex gap-10 flex-col md:flex-row">
            <div className="flex-1">
              <div className="flex mb-2 items-center gap-5">
                <h1 className="text-2xl font-bold">
                  {data.titleNumber}
                </h1>
                <span
                  className={cn(
                    "rounded-full px-[18px] py-[6px] text-xs font-semibold",
                    data.tenure === "Freehold"
                      ? "bg-[#ff6e30] text-white"
                      : "bg-[#006a87] text-white"
                    )}
                  >
                  {data.tenure}
                </span>
              </div>
              
              <p>
                Quodsi haberent magnalia inter
                potentiam et divitias, et non illam
                quidem haec eo spectant haec quoque
                vos omnino desit illud quo solo
              </p>
              <p>
                Quodsi haberent magnalia inter
                potentiam et divitias, et non illam
                quidem haec eo spectant haec quoque
                vos omnino desit illud quo solo
              </p>
            </div>
            <div className="flex-1">
              <MapWrapper
                lng={data.x}
                lat={data.y}
              />
            </div>
          </div>
          ) : (
            <div>
              <h1 className="text-4xl font-bold ">Loading...</h1>
            </div>
        )}
      </div>
    </MainLayout>
  );
}
