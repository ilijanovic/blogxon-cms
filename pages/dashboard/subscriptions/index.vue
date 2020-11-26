<template>
  <div class="dashboard">
    <h1>Subscriptions</h1>
    <div class="buttonbox">
      <primary @click.native="$router.go(-1)">go back</primary>
    </div>
    <div class="messagebox"></div>
    <div class="messagebox">
      <small>Title</small>
      <input style="width: 100%" v-model="notification.title" />
      <small>Message</small>
      <textarea v-model="notification.options.body"></textarea>
      <small>Choose icon</small>
      <div
        @click="selectThumbnail(i)"
        class="preview"
        v-for="(thumbnail, i) in thumbnails"
        :key="thumbnail"
        v-ripple
        :class="{ borderactive: selectedIcon === thumbnail }"
      >
        <img :src="thumbnail" />
      </div>
      <small v-if="badges.length">Choose badge</small>
      <div style="display: flex; flex-flow: wrap">
        <div
          class="preview"
          v-for="(badge, i) in badges"
          :key="badge.path"
          :class="{ borderactive: selectedBadge === badge.path }"
        >
          <transition name="popup">
            <XIcon
              v-if="selectedBadge === badge.path"
              @click="deleteBadge(badge._id)"
              class="badgeIcon"
            />
          </transition>
          <div class="badgebox" @click="selectBadge(i)" v-ripple>
            <img :src="badge.path" />
          </div>
        </div>
        <div class="preview">
          <div v-ripple class="badgepreview">
            <img @load="freeMemory" v-if="image" :src="image" />
            <input v-if="!image" type="file" @change="preview" />
            <PlusCircleIcon class="plus" size="3x" v-if="!image" />
          </div>
          <primary
            v-if="image"
            style="margin-top: 5px"
            @click.native="uploadBadge"
            >Upload</primary
          >
        </div>
      </div>
      <small>Silent notification</small>
      <primarycheckbox v-model="notification.options.silent" />
      <primary
        :disabled="loading"
        :loading="loading"
        style="margin-left: auto"
        @click.native="send"
        >Send notification</primary
      >
      <transition name="popup">
        <success v-if="sended" text="Notification sended sucessfully" />
      </transition>
    </div>
  </div>
</template>
<script>
import contentLoader from '@/components/dashboard/loader/contentLoader'
import notFound from '@/components/dashboard/notFound'
import primary from '@/components/dashboard/button/primary'
import errorModal from '@/components/dashboard/modals/error'
import { XIcon, PlusCircleIcon } from 'vue-feather-icons'
import success from '@/components/dashboard/modals/success'
import primarycheckbox from '@/components/dashboard/checkbox/primarycheckbox'
export default {
  components: {
    primarycheckbox,
    primary,
    notFound,
    contentLoader,
    XIcon,
    success,
    PlusCircleIcon,
  },
  async fetch() {
    let [thumbnails, badges] = await Promise.all([
      this.$axios.$get('/api/internal/getThumbnails'),
      this.$axios.$get('/api/internal/getBadges'),
    ])
    this.thumbnails = thumbnails
    this.badges = badges
  },
  data() {
    return {
      sended: false,
      errorMessage: '',
      thumbnails: [],
      badges: [],
      image: null,
      file: null,
      selectedIcon: null,
      selectedBadge: null,
      loading: false,
      notification: {
        title: '',
        options: {
          body: '',
          icon: '',
          sound: 'default',
          vibrate: [500, 100, 500],
          badge: '',
          silent: false,
        },
      },
    }
  },
  methods: {
    async deleteBadge(_id) {
      try {
        await this.$axios.$post('/api/internal/deleteBadge', {
          _id,
        })
        let i = this.badges.findIndex((badge) => badge._id === _id)
        if (i !== -1) {
          this.badges.splice(i, 1)
        }
        this.$fetch()
      } catch (err) {
        console.log(err)
      }
    },
    async uploadBadge() {
      let formdata = new FormData()
      formdata.append('badge', this.file)
      try {
        this.errorMessage = ''
        let { data } = await this.$axios.$post(
          '/api/internal/uploadBadge',
          formdata
        )
        this.image = null
        this.file = null
        this.$fetch()
      } catch ({ response }) {
        this.errorMessage = response.data.message
      }
    },
    preview(e) {
      let [file] = e.target.files
      this.file = file
      this.image = URL.createObjectURL(file)
    },
    freeMemory() {
      URL.revokeObjectURL(this.image)
    },
    selectThumbnail(i) {
      this.selectedIcon = this.thumbnails[i]
      this.notification.options.icon = this.thumbnails[i]
    },
    selectBadge(i) {
      this.selectedBadge = this.badges[i].path
      this.notification.options.badge = this.badges[i].path
    },
    async send() {
      this.loading = true
      try {
        await this.$axios.$post('/api/internal/sendNotification', {
          notification: this.notification,
        })
        this.sended = true
        setTimeout(() => {
          this.sended = false
        }, 5000)
      } catch ({ response }) {}
      this.loading = false
    },
  },
  head() {
    return {
      title: 'Dashboard subscriptions',
    }
  },
  layout: 'dashboard',
}
</script>
<style lang="scss" scoped>
.dashboard {
  padding: 15px;
  max-width: 1000px;
  margin: 0 auto;
  .buttonbox {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    margin-bottom: 1em;
  }
  .messagebox {
    margin-top: 20px;
    textarea {
      resize: none;
      width: 100%;
      min-height: 100px;
    }
  }
  .preview {
    height: 120px;
    width: 120px;
    border: 1px solid #dadada;
    border-radius: 6px;
    position: relative;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    transition: 300ms;
    cursor: pointer;
    svg {
      transition: 300ms;
    }
    &:hover {
      border-color: grey;
      .plus {
        color: grey;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      left: 0;
      top: 0;
    }
  }
  .badgepreview {
    max-width: 100%;
    position: relative;
    border-radius: 6px;
    border: 1px solid #dadada;
    height: 120px;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      color: #dadada;
      margin: auto;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      left: 0;
      top: 0;
      border-radius: 6px;
    }
    display: flex;
    input {
      opacity: 0;
      position: absolute;
      margin: 0;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  .badgebox {
    width: 100%;
    height: 100%;
  }
  .badgeIcon {
    background: red;
    color: white;
    right: 0;
    top: 0;
    z-index: 2;
    position: absolute;
    border-radius: 6px;
  }
}
.borderactive {
  border: 2px solid rgb(8, 172, 8) !important;
  box-shadow: 0 0 10px -6px black;
  transform: scale(1.06);
}
</style>
