import { http, HttpResponse } from 'msw';
import { tasks, workers } from './data';

export const handlers = [
  // GET /api/tasks — 작업 목록 조회 (필터 파라미터 포함)
  http.get('/api/tasks', ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const workerId = url.searchParams.get('workerId');
    const type = url.searchParams.get('type');
    const query = url.searchParams.get('query');

    let result = [...tasks];

    if (status) result = result.filter((t) => t.status === status);
    if (workerId) result = result.filter((t) => t.workerId === workerId);
    if (type) result = result.filter((t) => t.type === type);
    if (query) result = result.filter((t) => t.title.includes(query));

    return HttpResponse.json(result);
  }),

  // GET /api/tasks/:id — 작업 상세 조회
  http.get('/api/tasks/:id', ({ params }) => {
    const task = tasks.find((t) => t.id === params.id);
    if (!task) return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    return HttpResponse.json(task);
  }),

  // POST /api/tasks — 작업 등록
  http.post('/api/tasks', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    const newTask = {
      id: `t${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
      ...body,
    };
    tasks.push(newTask as typeof tasks[number]);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  // PATCH /api/tasks/:id — 작업 수정
  http.patch('/api/tasks/:id', async ({ params, request }) => {
    const index = tasks.findIndex((t) => t.id === params.id);
    if (index === -1) return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    const body = await request.json() as Record<string, unknown>;
    tasks[index] = { ...tasks[index], ...body };
    return HttpResponse.json(tasks[index]);
  }),

  // DELETE /api/tasks/:id — 작업 삭제
  http.delete('/api/tasks/:id', ({ params }) => {
    const index = tasks.findIndex((t) => t.id === params.id);
    if (index === -1) return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    tasks.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  // GET /api/workers — 작업자 목록 조회
  http.get('/api/workers', () => {
    return HttpResponse.json(workers);
  }),

  // GET /api/stats — 대시보드 통계 조회
  http.get('/api/stats', () => {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const in_progress = tasks.filter((t) => t.status === 'in_progress').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const rejected = tasks.filter((t) => t.status === 'rejected').length;

    const byWorker = workers.map((w) => ({
      workerId: w.id,
      name: w.name,
      completed: tasks.filter((t) => t.workerId === w.id && t.status === 'completed').length,
      rejected: tasks.filter((t) => t.workerId === w.id && t.status === 'rejected').length,
      total: tasks.filter((t) => t.workerId === w.id).length,
    }));

    return HttpResponse.json({ total, pending, in_progress, completed, rejected, byWorker });
  }),
];
