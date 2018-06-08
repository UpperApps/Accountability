<template>
  <v-card class="mx-auto">
    <v-card-actions>
        <div class="md-subhead">
        <span></span>
        </div>
    </v-card-actions>
    <v-card-media>
      <div class="item">
        <div class="player">
          <video-player class="vjs-custom-skin"
                        :options="playerOptions"
                        :playsinline="true"></video-player>
        </div>
      </div>
    </v-card-media>
  </v-card>
</template>

<script>
  // videojs
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  // export
  export default {
    data () {
      return {
        playerOptions: {
          width: '500px',
          sources: [{
            type: 'video/mp4',
            src: 'http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L'
          }],
          poster: require('@/assets/thumbnail_video_gueitiro.jpg')
        }
      }
    },
    components: {
      videoPlayer
    }
  }
</script>