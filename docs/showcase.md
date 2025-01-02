# Showcase

### Demonstration: Handling Commits with Less Than 5 Files

<script setup>
import VideoPlayerOne from './.vitepress/components/showcase-demo-one.vue';
import VideoPlayerTwo from './.vitepress/components/showcase-demo-one.vue';
</script>

<VideoPlayerTwo />

### Demonstration: Handling Commits with More Than 5 Files

When the number of files to be committed exceeds 5, `git-mind` optimizes the process to save resources. It uses the first three files to create context, enabling a better understanding of the commit's purpose. Afterward, it stages all files at once using `git add .`.

This approach ensures efficient commit creation without sacrificing performance or clarity.

<VideoPlayerOne />
