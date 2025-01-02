# Showcase

### Demonstration: Handling Commits with More Than 5 Files

When the number of files to be committed exceeds 5, `git-mind` optimizes the process to save resources. It uses the first three files to create context, enabling a better understanding of the commit's purpose. Afterward, it stages all files at once using `git add .`.

This approach ensures efficient commit creation without sacrificing performance or clarity.

<script setup>
import VideoPlayer from './.vitepress/components/showcase.vue';
</script>

<VideoPlayer />
