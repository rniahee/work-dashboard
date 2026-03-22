type Props = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <main>
      <h1>작업 상세 (id: {id})</h1>
      {/* 작업 상세 정보 조회 */}
      {/* 작업 수정 / 삭제 */}
    </main>
  );
}
