<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="create()">Add note!</button>

    <VueDragResize 
      v-for="note in notes" :key="note.id"
      :isActive="true" 
      :isResizable="false"
      :x="note.left"
      :y="note.top"
      :w="240"
      :h="180"
      v-on:dragging="drag(note, $event)"
      v-on:deactivated="save(note)"
      contentClass="postit">

      <div class="postit-text" @click="enableEditMode(note)">
        <VueShowdown
          :markdown="note.text"
        />
      </div>

      <div class="postit-form" @click="focus(note.id)">
        <textarea
          v-show="note.inInEditMode"
          :name="note.id"
          :id="note.id"
          :ref="note.id"
          v-model="note.text"
          rows="7"
          placeholder="add your markdown text">
        </textarea>
      </div>

      <div class="postit-footer">
        <p>{{ note.top }} х {{ note.left }}</p>
      </div>

    </VueDragResize>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'
import { v4 as uuidv4 } from 'uuid';

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
          id: uuidv4(),
          text: `# This is the first note! 
- option 1 
- option 2

> the present is our past.`,
          top: 333,
          left: 300,
          inInEditMode: false
        },
        {
          id: uuidv4(),
          text: '## This is the second note! :smiley:',
          top: 98,
          left: 733,
          inInEditMode: false
        },
        {
          id: uuidv4(),
          text: "It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)",
          top: 400,
          left: 700,
          inInEditMode: false
        },
        {
          id: uuidv4(),
          text: `First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column`,
          top: 200,
          left: 3,
          inInEditMode: false 
        }
      ]
    }
  },

  methods: {
    drag(note, newRect) {
      note.top = newRect.top;
      note.left = newRect.left;
    },

    create() {
      const newNote = {
        id: uuidv4(),
        text: `## New note :new:`,
        top: this.randomIntFromInterval(),
        left: this.randomIntFromInterval(),
        inInEditMode: false
      }

      // persist data
      this.notes.push(newNote);
    },

    save(note) {
      note.inInEditMode = false;
    },

    enableEditMode(note) {
      note.inInEditMode = true;
      this.focus(note.id);
    },

    focus(refKey) {
      if (this.$refs[refKey]) {
        this.$refs[refKey][0].focus();
      }
    },

    randomIntFromInterval(min = 50, max = 150) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
  
}
</script>

<style scoped>
.postit {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5px;

  overflow-y: auto;
  overflow-x: hidden;

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

.postit-text {
  padding: 5px;
}

.postit-text:hover {
  border: 1px solid DodgerBlue;
}

.postit-form {
  width: 100%;
}
</style>
