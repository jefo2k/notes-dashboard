<template>
  <div>
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
      @deactivated="setNoteOnEditionMode(null)"
      @dragging="drag(note, $event)"
      @dragstop="update(note)"
      contentClass="postit">

      <div class="postit-header">
        <button @click="remove(note.id)">x</button>
        <span>{{ note.top }} х {{ note.left }}</span>
        <span>{{ note.createdAt }}</span>
      </div>
      
      <div class="postit-text" @click="setNoteOnEditionMode(note.id)">
        <VueShowdown
          :markdown="note.text"
        />
      </div>

      <div class="postit-form" @click="focus(note.id)">
        <textarea
          v-show="noteOnEditionMode === note.id"
          @blur="update(note); setNoteOnEditionMode(null);"
          :name="note.id"
          :id="note.id"
          :ref="note.id"
          v-model="note.text"
          rows="7"
          placeholder="add your markdown text">
        </textarea>
      </div>
    </VueDragResize>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize';

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
      notes: [],
      noteOnEditionMode: null
    }
  },

  methods: {
    drag(note, newRect) {
      note.top = newRect.top;
      note.left = newRect.left;
    },

    async loadAll() {
      const response = await this.$http.get('notes');
      this.notes = response.data;
    },

    async create() {
      const newNote = {
        text: `## New note :new:`,
        top: this.randomIntFromInterval(),
        left: this.randomIntFromInterval()
      }

      await this.$http.post('notes', newNote);

      await this.loadAll();
    },

    async remove(noteId) {
      await this.$http.delete(`notes/${noteId}`);

      await this.loadAll();
    },

    async update(note) {
      await this.$http.patch(`notes/${note.id}`, note);

      await this.loadAll();
    },

    focus(refKey) {
      if (this.$refs[refKey]) {
        this.$refs[refKey][0].focus();
      }
    },

    setNoteOnEditionMode(noteId) {
      this.noteOnEditionMode = noteId;
    },

    randomIntFromInterval(min = 50, max = 150) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  },

  created(){
    this.loadAll();
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

.postit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: .70rem;
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
