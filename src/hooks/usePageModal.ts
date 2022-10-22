import { ref } from "vue";
import PageModal from "@/components/page-modal";

type CallbackFn = (item?: any) => void;

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const defaultInfo = ref({});
  const dialogTitle = ref("");
  const handleAddData = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    dialogTitle.value = "新建";

    newCb && newCb(); //新建的回调函数
  };
  const handleUpdateData = (item: any) => {
    console.log("编辑：", item);
    defaultInfo.value = { ...item };
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    dialogTitle.value = "编辑";

    editCb && editCb(item); //编辑的回调函数
  };

  return [
    handleAddData,
    handleUpdateData,
    pageModalRef,
    defaultInfo,
    dialogTitle
  ];
}
