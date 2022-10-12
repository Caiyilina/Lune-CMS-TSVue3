import { ref } from "vue";
import PageContent from "@/components/page-content";

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();

  const HandleResetClick = () => {
    console.log("reset");
    pageContentRef.value?.getPageData();
  };
  const HandleQueryClick = (queryInfo: any) => {
    console.log("query：", queryInfo);
    pageContentRef.value?.getPageData(queryInfo);
  };

  return [pageContentRef, HandleResetClick, HandleQueryClick];
}
