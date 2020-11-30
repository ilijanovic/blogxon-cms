<template>
  <div
    class="h-screen bg-gray-700 flex flex-col text-gray-100 fixed top-0 left-0"
  >
    <NuxtLink
      v-for="link in links"
      :key="link.path"
      class="hover:bg-gray-100 transition-all duration-200 rounded-md hover:text-gray-700 block m-2 p-4"
      title="Overview"
      :to="link.path"
    >
      <component :is="link.comp" size="1.8x" />
    </NuxtLink>
    <NuxtLink
      class="hover:bg-gray-100 transition-all mt-auto duration-200 rounded-md hover:text-gray-700 block mx-2 mb-8 p-4"
      to="/dashboard/logout"
    >
      <LogOutIcon size="1.8x" />
    </NuxtLink>
  </div>
</template>
<script>
import {
  MonitorIcon,
  MailIcon,
  BookIcon,
  SettingsIcon,
  SendIcon,
  LogOutIcon,
} from 'vue-feather-icons'
export default {
  data: () => ({
    links: [
      {
        path: '/dashboard/overview',
        comp: 'MonitorIcon',
      },
      {
        path: '/dashboard/emails',
        comp: 'MailIcon',
      },
      {
        path: '/dashboard/blogs',
        comp: 'BookIcon',
      },
      {
        path: '/dashboard/subscriptions',
        comp: 'SendIcon',
      },
      {
        path: '/dashboard/settings',
        comp: 'SettingsIcon',
      },
    ],
  }),
  components: {
    MonitorIcon,
    BookIcon,
    SettingsIcon,
    MailIcon,
    SendIcon,
    LogOutIcon,
  },
}
</script>

