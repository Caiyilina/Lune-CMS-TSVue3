<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" class="img" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+Ts</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      :collapse="collapse"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="iconString(item.icon)"></component>
              </el-icon>
              <!-- <i v-if="item.icon" :class="item.icon"></i> -->
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单遍历里面的item -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleItemClick(subItem)"
              >
                <el-icon v-if="subItem.icon">
                  <component :is="iconString(subItem.icon)"></component>
                </el-icon>
                <span> {{ subItem.name }} </span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''" @click="handleItemClick(item)">
            <el-icon v-if="item.icon">
              <component :is="iconString(item.icon)"></component>
            </el-icon>
            <span> {{ item.name }} </span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "@/store/index"; //使用自己封装的useStore，因为vuex对ts支持差，拿到的userStore类型是any，没有类型限制
import { useRouter, useRoute } from "vue-router";
import { pathMapToMenu } from "@/utils/map-menus";
export default defineComponent({
  name: "nav-menu",
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const currentPath = route.path;
    const userMenus = computed(() => store.state.login.userMenus);

    // 将el-icon-x 转为 x
    const iconString = (icon: string) => {
      return icon.substring(8);
    };

    // data
    const menu = pathMapToMenu(userMenus.value, currentPath);

    const defaultValue = ref(menu.id + "");

    const handleItemClick = (item: any) => {
      // console.log("点击的菜单：", item);
      router.push({
        path: item.url ?? "/not-found"
      });
    };

    return { userMenus, defaultValue, iconString, handleItemClick };
  }
});
</script>
<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
