<template>
    <div ref="codeEditBox" class="editor-wrapper" />
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { editorProps } from './type'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

// worker 生成器
self.MonacoEnvironment = {

    getWorker(_: string, label: string) {
        if (label === 'json') {
        return new JsonWorker()
        }
        if (['css', 'scss', 'less'].includes(label)) {
        return new cssWorker()
        }
        if (['html', 'handlebars', 'razor'].includes(label)) {
        return new htmlWorker()
        }
        if (['typescript', 'javascript'].includes(label)) {
        return new tsWorker()
        }
        return new EditorWorker()
    },
}

const props = defineProps(editorProps);
const emit = defineEmits(['update:modelValue', 'change', 'editor - mounted']);

let editor: monaco.editor.IStandaloneCodeEditor | undefined;
const codeEditBox = ref<HTMLElement | null>(null);

const init = () => {
  // 设置TypeScript/JavaScript诊断选项和编译器选项
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false
  });
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true
  });

  if (codeEditBox.value) {
    editor = monaco.editor.create(codeEditBox.value, {
      value: props.modelValue,
      language: props.language,
      theme: props.theme,
      ...props.options
    });

    editor.onDidChangeModelContent(() => {
      const value = editor.getValue();
      emit('update:modelValue', value);
      emit('change', value);
    });

    emit('editor - mounted', editor);
  }
};

watch(
  () => props.modelValue,
  newValue => {
    if (editor) {
      const value = editor.getValue();
      if (newValue !== value) {
        editor.setValue(newValue);
      }
    }
  }
);

watch(
  () => props.options,
  newValue => {
    if (editor) {
      editor.updateOptions(newValue);
    }
  },
  { deep: true }
);

watch(
  () => props.language,
  newValue => {
    if (editor && editor.getModel()) {
      monaco.editor.setModelLanguage(editor.getModel(), newValue);
    }
  }
);

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose();
  }
});

onMounted(() => {
  init();
});
</script>
<script lang="ts">
export default {
  name: 'ceshi1',
}
</script>
<style scoped>
.searchForm .el-form-item {
  margin-bottom: v-bind(more ? '18px' : '0px');
}

* {
  font-weight: 900;
}

.editor-wrapper {
  width: 100%;
  height: 100px;
}
</style>