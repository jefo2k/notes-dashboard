<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
  <VueDragResize 
    v-for="note in notes" :key="note.id"
    :isActive="true" 
    :isResizable="false"
    :x="note.left"
    :y="note.top"
    :w="220"
    :h="220"
    v-on:dragging="dragg(note, $event)"
    class="postit">
    <div class="content">
      <h3>{{ note.text }}</h3>
      <p>{{ note.top }} х {{ note.left }} </p>
    </div>
  </VueDragResize>
</template>

<script>
import VueDragResize from 'vue-drag-resize'

export default {
  name: 'Board',

  props: {
    msg: String
  },

  components: {
    VueDragResize
  },

  data() {
    return {
      notes: [
        {
          id: 'note1',
          text: 'This is the first note!',
          top: 333,
          left: 333 
        },
        {
          id: 'note2',
          text: 'This is the second note!',
          top: 98,
          left: 733 
        },
        {
          id: 'note3',
          text: 'This is the third note!',
          top: 400,
          left: 700 
        },
        {
          id: 'note4',
          text: 'This is the fourth note!',
          top: 200,
          left: 3 
        }
      ],
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  },

  methods: {
    drag(newRect) {
      console.log('### ', newRect);
      this.top = newRect.top;
      this.left = newRect.left;
    },
    dragg(note, newRect) {
      note.top = newRect.top;
      note.left = newRect.left;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 20px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.postit {
  line-height: 1;
  border:1px solid #E8E8E8;
  
  background: #ffff88; /* Old browsers */
  background: -moz-linear-gradient(-45deg, #ffff88 81%, #ffff88 82%, #ffff88 82%, #ffffc6 100%); /* FF3.6+ */
  background: -webkit-gradient(linear, left top, right bottom, color-stop(81%,#ffff88), color-stop(82%,#ffff88), color-stop(82%,#ffff88), color-stop(100%,#ffffc6)); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(-45deg, #ffff88 81%,#ffff88 82%,#ffff88 82%,#ffffc6 100%); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(-45deg, #ffff88 81%,#ffff88 82%,#ffff88 82%,#ffffc6 100%); /* Opera 11.10+ */
  background: -ms-linear-gradient(-45deg, #ffff88 81%,#ffff88 82%,#ffff88 82%,#ffffc6 100%); /* IE10+ */
  background: linear-gradient(135deg, #ffff88 81%,#ffff88 82%,#ffff88 82%,#ffffc6 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffff88', endColorstr='#ffffc6',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
</style>
