<template>
    <div ref="codeEditBox" class="editor-wrapper" />
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import type { Options } from './type';
import { createDefaultOptions } from './type';

const emits = defineEmits(['update:modelValue', 'change', 'editor-mounted']);

const props = withDefaults(defineProps<Partial<{
  modelValue: string;
  width: string;
  height: string;
  readonly: boolean;
  autoFocus: boolean;
  language: string;
  suggestions: boolean;
  containerClass: string;
  theme: boolean;
  options: Options;
}>>(), {
  width: '100%',
  height: '500px',
  readonly: false,
  autoFocus: false,
  language: 'json',
  suggestions: false,
  theme: true,
  options: () => {
    return {};
  },
});

const codeEditBox = ref();
let editor: any;
let completionItemProvider: any;

// 初始化
const init = () => {
    const options = {
      value: props.modelValue,
      language: props.language,
      readOnly: props.readonly,
      theme: props.theme ? 'vs' : 'vs-dark',
      ...createDefaultOptions(),
      ...props.options,
    };
    // 创建编辑器
    editor = monaco.editor.create(codeEditBox.value, options);
    // 注册代码提示
    registerSuggestions();
    // 自动聚焦
    if (props.autoFocus) {
      editor.focus();
    }
    // 监听值的变化
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue();
      emits('update:modelValue', value);
      emits('change', value);
    });
    emits('editor-mounted', editor);
  };

  // 获取值
  const getValue = () => {
    return editor?.getValue();
  };

  // 设置值
  const setValue = (value: string) => {
    editor?.setValue(value);
  };

  defineExpose({ getValue, setValue });

  // 监听主题变更
  watch(() => props.theme, (v) => {
    if (editor) {
      editor.updateOptions({ theme: v ? 'vs' : 'vs-dark' });
    }
  });

  // 监听数据变更
  watch(() => props.modelValue, (v) => {
    if (editor) {
      const value = editor.getValue();
      if (v !== value) {
        editor.setValue(v);
      }
    }
  });

  // 监听配置变更
  watch(() => props.options, (v) => {
    if (editor) {
      editor.updateOptions(v);
    }
  }, { deep: true });

  // 监听只读
  watch(() => props.readonly, () => {
    if (editor) {
      editor.updateOptions({ readOnly: props.readonly });
    }
  });

  // 修改语言
  watch(() => props.language, (v) => {
    if (editor) {
      monaco.editor.setModelLanguage(editor?.getModel(), v as string);
    }
    // 注册代码提示
    registerSuggestions();
  });

  // 注册代码提示
  const registerSuggestions = () => {
    if (!props.suggestions) {
      return;
    }
    if (props.language === 'shell') {
      completionItemProvider?.dispose();
      completionItemProvider = monaco.languages.registerCompletionItemProvider(props.language, shellSuggestions);
    }
  };

  // 初始化
  onMounted(init);

  // 卸载
  onBeforeUnmount(() => {
    completionItemProvider?.dispose();
    completionItemProvider = undefined;
    editor?.dispose();
    editor = undefined;
  });

</script>

<style scoped>
* {
  font-weight: 900;
}

.editor-wrapper {
    width: v-bind(width);
    height: v-bind(height);
}
</style>