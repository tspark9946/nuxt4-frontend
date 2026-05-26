<script setup lang="ts">
const authStore = useAuthStore();
const clientStore = useClientStore();

// Nuxt 4 스타일의 데이터 모델 정의
const state = reactive({
  client_id: '',
  client_serial: '',
  client_name: '',
  client_zip: '',
  client_address1: '',
  client_address2: '',
  client_email: '',
  client_etc: '',
  client_alert: '',
  rank_id: '',
  client_firstdate: '',
  client_debt: '',
  client_resmoney: '',
  client_point: '',
  client_memo1: '',
  client_memo1_encoded: '',
  client_memo2: '',
  client_memo2_encoded: '',
  client_state: '',
});

const grades = ['일반', 'VIP', 'VVIP'];
const username = ref('');
const userId = ref(0);
const hospitalId = ref(0);

const form = useTemplateRef('form');

// auth store의 user 정보가 변경될 때 자동으로 form 갱신
watch(() => authStore.user, (user) => {
  if (user) {
    username.value = user.name;
    userId.value = user.uid;
    hospitalId.value = user.hid;
  }
}, { immediate: true });

async function onSubmit() {
  try {
    // 빈 필드 제거 및 타입 변환
    const clientData = {
      client_serial: state.client_serial ? Number.parseInt(state.client_serial) : 0,
      client_name: state.client_name || null,
      client_zip: state.client_zip || null,
      client_address1: state.client_address1 || null,
      client_address2: state.client_address2 || null,
      client_email: state.client_email || null,
      client_etc: state.client_etc || null,
      client_firstdate: state.client_firstdate || null,
      client_debt: state.client_debt || '0',
      client_resmoney: state.client_resmoney || '0',
      client_point: state.client_point || '0',
      client_memo1: state.client_memo1 || null,
      client_memo1_encoded: state.client_memo1_encoded || null,
      client_memo2: state.client_memo2 || null,
      client_memo2_encoded: state.client_memo2_encoded || null,
      client_alert: state.client_alert ? Number.parseInt(state.client_alert) : 0,
      client_state: !!state.client_state,
      rank_id: state.rank_id ? Number.parseInt(state.rank_id) : undefined,
    };

    const res = await clientStore.createClient(clientData);
    console.warn('저장 성공:', res);
  }
  catch (err) {
    console.error('에러 발생:', err);
  }
}
</script>

<template>
  <UCard class="max-w-3xl mx-auto mt-10">
    <!-- 카드 헤더: 제목 및 도구 모음 -->
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
          고객 정보
        </h3>
        <div> 로그인: {{ username }} Id: {{ userId }} Hospital Id: {{ hospitalId }}</div>
        <div class="flex gap-2">
          <UButton icon="i-heroicons-paper-airplane" size="xs" variant="ghost" label="정보 동의 요청" />
          <UButton icon="i-heroicons-arrow-path" color="gray" variant="ghost" />
          <UButton icon="i-heroicons-plus" color="gray" variant="ghost" />
          <UButton icon="i-heroicons-pencil-square" color="gray" variant="ghost" />
          <UButton icon="i-heroicons-trash" color="gray" variant="ghost" />
          <UButton icon="i-heroicons-cog-6-tooth" color="gray" variant="ghost" />
        </div>
      </div>
    </template>

    <!-- 입력 폼 그리드 구성 -->
    <UForm ref="form" :state="state" class="space-y-2" @submit="onSubmit">
      <UFormField orientation="horizontal" label="고객번호" name="client_serial" class="justify-start" :ui="{ wrapper: 'gap-1', label: 'w-20' }">
        <UInput v-model="state.client_serial" class="w-30" />
      </UFormField>

      <UFormField orientation="horizontal" label="이름" required name="client_name" class="justify-start" :ui="{ label: 'w-20' }">
        <UInput v-model="state.client_name" class="w-30" />
      </UFormField>

      <UFormField orientation="horizontal" label="우편번호" name="client_zip" class="justify-start" :ui="{ wrapper: 'gap-1', label: 'w-20' }">
        <div class="flex items-center gap-1">
          <UInput v-model="state.client_zip" class="flex-1 w-20" />
          <UButton icon="i-heroicons-magnifying-glass" size="sm" variant="outline" @click="alert('우편번호 검색')" />
        </div>
      </UFormField>

      <UFormField orientation="horizontal" label="주소" name="client_address1" class="justify-start" :ui="{ wrapper: 'gap-1', label: 'w-20' }">
        <UInput v-model="state.client_address1" class="w-100" />
      </UFormField>

      <UFormField orientation="horizontal" label="상세 주소" name="client_address2" class="justify-start" :ui="{ label: 'w-20' }">
        <UInput v-model="state.client_address2" class="w-100" />
      </UFormField>

      <UFormField orientation="horizontal" label="이메일" name="client_email" class="justify-start" :ui="{ wrapper: 'gap-1', label: 'w-20' }">
        <div class="flex items-center gap-2">
          <UInput class="flex-1 w-40" />
          <span>@</span>
          <UInput class="flex-1" />
        </div>
      </UFormField>

      <UFormField orientation="horizontal" label="전화번호" name="client_memo2" class="justify-start" :ui="{ wrapper: 'gap-1', label: 'w-20' }">
        <UTextarea v-model="state.client_memo2" :rows="5" class="w-100" />
      </UFormField>

      <div class="grid grid-cols-2 gap-2">
        <UFormField orientation="horizontal" label="첫 방문일" name="client_firstdate" class="w-52" :ui="{ label: 'w-20' }">
          <UInput v-model="state.client_firstdate" />
        </UFormField>
        <UFormField orientation="horizontal" label="Rank" name="rank_id" class="w-52 justify-start" :ui="{ label: 'w-10' }">
          <USelect :options="grades" />
        </UFormField>
      </div>

      <UFormField orientation="horizontal" label="기타정보" name="client_etc" class="justify-start" :ui="{ label: 'w-20' }">
        <UInput v-model="state.client_etc" class="w-100" />
      </UFormField>

      <UFormField orientation="horizontal" label="고객 메모" name="client_memo1" class="justify-start" :ui="{ wrapper: 'gap-1', label: 'w-20' }">
        <UTextarea v-model="state.client_memo1" :rows="5" class="w-100" />
      </UFormField>

      <!-- 하단 요약 정보 섹션 -->
      <div class="grid grid-cols-2 gap-y-2 pt-4 border-t text-sm font-medium">
        <div class="flex justify-between px-2">
          <span>총 수납액</span> <span>0 원</span>
        </div>
        <div class="flex justify-between px-2">
          <span>예치금</span> <span>0 원</span>
        </div>
        <div class="flex justify-between px-2 text-red-500">
          <span>미수액</span> <span>0 원</span>
        </div>
        <div class="flex justify-between px-2">
          <span>포인트</span> <span>0 원</span>
        </div>
      </div>
      <div class="flex gap-2 mt-8">
        <UButton type="submit">
          Submit
        </UButton>

        <UButton variant="outline" @click="form?.clear()">
          Clear
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
