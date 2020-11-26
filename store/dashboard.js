export const state = () => ({
  blogs: [],
  users: [],
  errorMessage: '',
})
export const mutations = {
  REMOVE_BLOG(state, id) {
    let i = state.blogs.findIndex((blog) => blog._id === id)
    if (i !== -1) {
      state.blogs.splice(i, 1)
    }
  },
  SET_BLOGS(state, blogs) {
    state.blogs = blogs
  },
  SET_USERS(state, users) {
    state.users = users
  },
  REMOVE_USER(state, id) {
    let i = state.users.findIndex((user) => user._id === id)
    if (i !== -1) {
      state.users.splice(i, 1)
    }
  },
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },
}
export const getters = {
  blogs: (state) => state.blogs,
  users: (state) => state.users,
  errorMessage: (state) => state.errorMessage,
}
