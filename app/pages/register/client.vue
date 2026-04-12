<script setup lang="ts">
// Nuxt 4 스타일의 데이터 모델 정의
const state = reactive({
  name: '',
  customerNo: '',
  emailId: '',
  emailDomain: '',
  phone1: '',
  phone2: '',
  phone3: '',
  address: '',
  detailAddress: '',
  grade: '일반',
  carNumber: '',
  isStaff: false,
  memo: '',
});

const grades = ['일반', 'VIP', 'VVIP'];

async function onSubmit() {
  // 전송 시 FormData를 사용하는 예시
  const formData = new FormData();
  Object.entries(state).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  try {
    const res = await $fetch('/api/customer', {
      method: 'POST',
      body: formData,
    });
    console.log('저장 성공', res);
  }
  catch (err) {
    console.error('에러 발생', err);
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
    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <div class="grid grid-cols-2 gap-4">
        <UFormGroup label="이름" name="name" required description="고객의 이름을 입력하세요">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup label="고객 번호" name="customerNo">
          <UInput v-model="state.customerNo" />
        </UFormGroup>
      </div>

      <UFormGroup label="이메일" name="email">
        <div class="flex items-center gap-2">
          <UInput v-model="state.emailId" class="flex-1" />
          <span>@</span>
          <UInput v-model="state.emailDomain" class="flex-1" />
        </div>
      </UFormGroup>

      <UFormGroup label="전화 번호" name="phone">
        <div class="flex items-center gap-2">
          <UInput v-model="state.phone1" class="w-20" />
          <UInput v-model="state.phone2" class="flex-1" />
          <UInput v-model="state.phone3" class="flex-1" />
          <UIcon name="i-heroicons-star" class="text-yellow-400 w-5 h-5" />
        </div>
      </UFormGroup>

      <UFormGroup label="주소" name="address">
        <UInput v-model="state.address" />
      </UFormGroup>

      <UFormGroup label="상세 주소" name="detailAddress">
        <UInput v-model="state.detailAddress" />
      </UFormGroup>

      <div class="grid grid-cols-3 gap-4">
        <UFormGroup label="고객 등급" name="grade">
          <USelect v-model="state.grade" :options="grades" />
        </UFormGroup>
        <UFormGroup label="차량 번호" name="carNumber">
          <UInput v-model="state.carNumber" />
        </UFormGroup>
        <UFormGroup label="직원" name="isStaff" class="flex flex-col justify-end">
          <UCheckbox v-model="state.isStaff" />
        </UFormGroup>
      </div>

      <UFormGroup label="고객 메모" name="memo">
        <UTextarea v-model="state.memo" :rows="5" />
      </UFormGroup>

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
    </UForm>
  </UCard>
</template>
