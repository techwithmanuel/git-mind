<template>
  <div class="video-container">
    <video controls>
      <source src="/demo-2.mov" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  name: "VideoPlayerOne",
};
</script>

<style scoped>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border-radius: 10px;
}

video {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}
</style>
