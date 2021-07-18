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
    :h="250"
    v-on:dragging="drag(note, $event)"
    contentClass="postit">
    <div class="content">      
      <VueShowdown
        :markdown="note.text"
        @click="edit(note)"
      />

      <textarea
        v-if="note.inInEditMode"
        :name="note.id"
        :id="note.id"
        :ref="note.id"
        v-model="note.text"
        cols="40"
        rows="7"
        placeholder="add your markdown text">
      </textarea>

      <p>{{ note.top }} х {{ note.left }} </p>
    </div>
    <!-- <a-modal v-model:visible="visible" title="Edit Note" @ok="handleOk">
      <textarea 
        :name="note.id" 
        :id="note.id" 
        v-model="note.text" 
        cols="40" 
        rows="7" 
        placeholder="add your markdown text">
      </textarea>
    </a-modal> -->
  </VueDragResize>

</template>

<script>
import { ref } from 'vue';
import VueDragResize from 'vue-drag-resize';

export default {
  name: 'Board',

  props: {
    msg: String
  },

  components: {
    VueDragResize
  },

  setup() {
    const visible = ref(false);

    const handleOk = e => {
      console.log(e);
    };

    const drag = (note, newRect) => {
      note.top = newRect.top;
      note.left = newRect.left;
    };

    const notes = ref([
        {
          id: 'note1',
          text: `# This is the first note! 
- option 1 
- option 2

> the present is our past.`,
          top: 333,
          left: 300,
          inInEditMode: false
        },
        {
          id: 'note2',
          text: '## This is the second note! :smiley:',
          top: 98,
          left: 733,
          inInEditMode: false
        },
        {
          id: 'note3',
          text: "It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)",
          top: 400,
          left: 700,
          inInEditMode: false
        },
        {
          id: 'note4',
          text: `First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column`,
          top: 200,
          left: 3,
          inInEditMode: false 
        }
      ]);

    return {
      visible,
      notes,
      handleOk,
      drag
    };
  },
  methods: {
    edit(note) {
      // Modal.info({
      //   title: 'Edit note',
      //   content: h('div', {}, [
      //     h('textarea', { 
      //       name: note.id,
      //       id: note.id,
      //       value: note.text,
      //       cols: "30",
      //       rows: "7", 
      //       placeholder: "add your markdown text"
      //     }),
      //   ]),
      //   on: {
      //     textarea: function (event) {
      //       self.$emit('textarea', event.target.value)
      //     }
      //   },
      //   onOk() {
      //     console.log('ok');
      //   },
      // });
      note.inInEditMode = true;
      //this.$refs[note.id].focus();

      console.log('### textAreas: ', this.textAreas);
      for (let i in this.textAreas) {
        console.log('### textArea: ', i);
      }

      console.log('### note: ', note);
      console.log('### note.id: ', note.id);

      console.log('### this.$refs: ', this.$refs);
      // const textAreaRef = note.id;
      console.log('### this.$refs[textAreaRef]: ', this.$refs[0]);
      // this.$refs[textAreaRef].focus();

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.content {
  display: flex;
  flex-direction: column;
  padding: 10px;

  height:200px;
  overflow-y: auto;
}
</style>
