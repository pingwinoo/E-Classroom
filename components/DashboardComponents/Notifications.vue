<template>
  <div id="notifications">
    <h4 class="section-title">Notifications</h4>
    <!-- <pre>{{notifications}}</pre> -->
    <div v-if="!isLoading" class="notifications">
      <div v-if="notifications && notifications.length>0">
        <div
          class="notification"
          v-for="(notification,index) in notifications.slice(0,5)"
          :key="notification._id"
        >
          <div class="notification-dot" :style="{backgroundColor:colors[index]}"></div>
          <p class="notification-message">{{notification.title}}</p>
        </div>
      </div>
      <p v-else>No Notifications</p>
    </div>
    <div class="spinner-wrapper" v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Spinner from '@/components/Spinner'

export default {
  components: {
    Spinner
  },
  data() {
    return {
      colors: [
        '#005691',
        '#9896f1',
        '#fbe1b6',
        '#74f9ff',
        '#bad7df',
        '#ffbd39',
        '#f73859',
        '#39065a',
        '#45eba5'
      ],
      isLoading: true
    }
  },
  computed: {
    ...mapGetters({
      notifications: 'getNotifications'
    })
  },
  methods: {
    async fetchNotifications() {
      const response = await this.$store.dispatch('fetchNotifications')

      if (response.data.error) {
        this.$toast.open({
          type: 'error',
          message: response.data.message,
          position: 'top-right',
          duration: 1500
        })
        return false
      } else {
        this.$store.commit('setNotifications', {
          addIntoExisting: false,
          data: response.data.payload
        })
      }
      this.isLoading = false
    }
  },
  mounted() {
    this.fetchNotifications()
  }
}
</script>

<style lang="scss" scoped>
.spinner-wrapper {
  width: 100%;
  height: 100%;

  .spinner {
    margin-left: 4rem;
    margin-top: 4rem;
  }
}

#notifications {
  // margin-top: 2rem;
  // min-height: 100px;
  overflow: auto;
  overflow-x: hidden;
  background-color: var(--secondary-background-color);

  h4 {
    margin-bottom: 12px;
  }
}

.notifications {
  margin-top: 6px;

  .notification {
    margin-bottom: 6px;
    // background-color: #dddddd;

    padding: 2px 4px;
    border-radius: 2px;
    display: flex;

    p {
      font-size: 12px;
      line-height: 18px;

      &:hover {
        filter: opacity(0.8);
      }
    }
  }
  .notification-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-top: 4px;
    margin-right: 8px;
  }
}
</style>