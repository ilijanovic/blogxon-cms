<template>
  <div class="blog">
    <h1>Update blog post</h1>
    <transition mode="out-in" name="popup">
      <contentLoader v-if="$fetchState.pending" />
      <notFound
        message="Blog post not found"
        v-if="!$fetchState.pending && !found"
      />
      <div v-if="!$fetchState.pending && loaded && found">
        <div class="inputbox">
          <div class="description">
            <small>Title</small>
            <small>Optional length: 50-60 characters</small>
            <small
              :class="{
                green: titleLength >= 50 && titleLength <= 60,
                red: titleLength >= maxTitleLength,
              }"
              >{{ titleLength }} / {{ maxTitleLength }}</small
            >
          </div>
          <input
            @keyup="checkTitleLength"
            @change="checkTitleLength"
            v-model="title"
          />
        </div>
        <div class="inputbox">
          <div class="description">
            <small>Description</small>
            <small>Optional length: 120-160 characters</small>
            <small
              :class="{
                red: descriptionLength >= maxDescriptionLength,
                green: descriptionLength >= 120 && descriptionLength <= 160,
              }"
              >{{ descriptionLength }} / {{ maxDescriptionLength }}</small
            >
          </div>
          <textarea
            @keyup="checkDescriptionLength"
            @change="checkDescriptionLength"
            v-model="description"
          ></textarea>
        </div>
        <div class="inputbox">
          <div class="description">
            <small>Keywords</small>
            <small>{{ keywordsLength }} / {{ maxKeywords }}</small>
          </div>
          <div class="keywordsbox">
            <input
              @keyup.space="addKeyword"
              @keyup.enter="addKeyword"
              v-model="keyword"
            />
            <primary @click.native="addKeyword" style="height: fit-content"
              >Add</primary
            >
          </div>
          <div style="display: flex; flex-flow: wrap">
            <div
              v-for="(keyword, i) in keywords"
              :key="keyword"
              class="keyword"
            >
              <p>{{ keyword }}</p>
              <XIcon @click="remove(i)" size="1.2x" />
            </div>
          </div>
          <div class="inputbox">
            <small>Thumbnail</small>
            <div
              :style="{ width: imageWidth + 'px', height: imageHeight + 'px' }"
              class="preview"
            >
              <img @load="freeMemory" v-if="image" :src="image" />
              <input v-if="!image" type="file" @change="preview" />
              <ImageIcon v-if="!image" size="4x" />
            </div>
          </div>
        </div>
        <div class="inputbox">
          <div class="description">
            <small>Structured data</small>
          </div>
          <dropdown v-model="options" />
        </div>
        <div class="inputbox">
          <div class="description">
            <small>Markdown editor</small>
            <primary @click.native="textPreview = !textPreview"
              >Toggle preview</primary
            >
          </div>
        </div>
        <TuiEditor
          v-if="!textPreview"
          v-model="post"
          mode="markdown"
          height="800px"
          style="margin-bottom: 20px"
        />
        <mdPreview v-if="textPreview" :text="post" />
        <primary
          @click.native="uploadPost"
          :disabled="disabled"
          style="margin-left: auto"
          >Upload</primary
        >
      </div>
    </transition>
  </div>
</template>

<script>
import { config } from '@/config'
import notFound from '@/components/dashboard/notFound'
import contentLoader from '@/components/dashboard/loader/contentLoader'
import primary from '@/components/dashboard/button/primary'
import { XIcon, ImageIcon } from 'vue-feather-icons'
import dropdown from '@/components/dashboard/dropdowns/dashboardDropdown'
import mdPreview from '@/components/dashboard/mdPreview'
export default {
  async fetch() {
    let blog = await this.$axios.$get(
      '/api/internal/getBlog/' + this.$route.params.id
    )
    this.loaded = true
    if (!blog) {
      this.found = false
      return
    }
    let {
      title,
      description,
      keywords,
      thumbnail,
      content,
      structuredData,
    } = blog
    this.title = title
    this.description = description
    this.keywords = keywords
    this.image = thumbnail
    this.post = content
    this.structuredData = structuredData
  },
  data() {
    return {
      found: true,
      title: '',
      structuredData: 'blog',
      description: '',
      keywords: [],
      keyword: '',
      image: '',
      post: '',
      file: '',
      textPreview: false,
      maxTitleLength: config.title_length,
      maxDescriptionLength: config.description_length,
      maxKeywords: config.keywords,
      options: ['blog'],
      imageWidth: config.thumbnail_sizes.width,
      imageHeight: config.thumbnail_sizes.height,
      loaded: false,
    }
  },
  components: {
    XIcon,
    dropdown,
    ImageIcon,
    mdPreview,
    contentLoader,
    notFound,
  },
  methods: {
    async uploadPost() {
      let formdata = new FormData()
      formdata.append('thumbnail', this.file)
      formdata.append('title', this.title)
      formdata.append('description', this.description)
      formdata.append('content', this.post)
      formdata.append('keywords', this.keywords)
      formdata.append('structuredData', this.structuredData)
      try {
        let { data } = await this.$axios.$post(
          '/api/internal/uploadPost',
          formdata
        )
      } catch (err) {}
    },
    preview(e) {
      let [file] = e.target.files
      this.file = file
      this.image = URL.createObjectURL(file)
    },
    checkTitleLength() {
      if (this.title.length > this.maxTitleLength) {
        this.title = this.title.substring(0, this.maxTitleLength)
      }
    },
    checkDescriptionLength() {
      if (this.description.length > this.maxDescriptionLength) {
        this.description = this.description.substring(
          0,
          this.maxDescriptionLength
        )
      }
    },
    freeMemory() {
      URL.revokeObjectURL(this.image)
    },
    remove(i) {
      this.keywords.splice(i, 1)
    },
    addKeyword() {
      let word = this.keyword.trim()
      if (!word || this.keywordsLength >= this.maxKeywords) return
      if (this.keywords.includes(word)) {
        this.keyword = ''
        return
      }
      this.keywords.push(word)
      this.keyword = ''
    },
  },
  computed: {
    disabled() {
      return (
        !this.titleLength ||
        !this.descriptionLength ||
        !this.keywordsLength ||
        !this.image ||
        !this.post
      )
    },
    titleLength() {
      return this.title.length
    },
    descriptionLength() {
      return this.description.length
    },
    keywordsLength() {
      return this.keywords.length
    },
  },
  layout: 'dashboard',
}
</script>
<style lang="scss" scoped>
.blog {
  padding: 15px;
  max-width: 700px;
  margin: 0 auto;
  .keywordsbox {
    display: flex;
    align-items: center;
    button {
      margin-left: 20px;
    }
  }
  .keyword {
    display: inline-block;
    border: 1px solid #dadada;
    margin-right: 6px;
    margin-bottom: 6px;
    border-radius: 6px;
    padding: 6px;
    display: flex;
    width: fit-content;
    align-items: center;
    svg {
      color: red;
      margin-left: 5px;
      cursor: pointer;
    }
  }
  .inputbox {
    margin: 20px 0;
    textarea {
      resize: none;
      width: 100%;
      height: 100px;
    }
    .description {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    input {
      width: 100%;
    }
    small {
      padding: 6px;
      border-radius: 6px;
      display: block;
      font-size: 16px;
      color: grey;
    }
  }
}
.green {
  background: green;
  color: white !important;
}
.red {
  background: red;
  color: white !important;
}
.preview {
  max-width: 100%;
  position: relative;
  border-radius: 6px;
  border: 1px solid #dadada;
  svg {
    color: #dadada;
    margin: auto;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
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
</style>
