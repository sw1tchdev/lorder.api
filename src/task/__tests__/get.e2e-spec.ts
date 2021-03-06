import { TestHelper } from '../../@test-helper/@utils/TestHelper';
import { projectsFixture, tasksFixture, userProjectFixture, usersFixture, userWorksFixture } from './@fixtures/get';

const h = new TestHelper('/tasks')
  .addFixture(usersFixture)
  .addFixture(projectsFixture)
  .addFixture(userProjectFixture)
  .addFixture(tasksFixture)
  .addFixture(userWorksFixture);

describe(`GET ${h.url}`, () => {
  beforeAll(h.before);
  afterAll(h.after);

  it('by guest', async () => {
    await h.requestBy().get(h.path()).expect(401).expect({
      message: 'Unauthorized',
      statusCode: 401,
    });
  });

  it('by user@mail.com', async () => {
    const { body } = await h
      .requestBy(await h.getUser('user@mail.com'))
      .get(h.path())
      .expect(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          createdAt: expect.any(String),
          createdById: null,
          description: expect.any(String),
          id: expect.any(Number),
          isArchived: false,
          performerId: expect.any(Number),
          projectId: expect.any(Number),
          sequenceNumber: expect.any(Number),
          source: null,
          status: 2,
          title: expect.any(String),
          typeId: null,
          updatedAt: expect.any(String),
          userTasks: expect.any(Array),
          value: expect.any(Number),
        }),
      ])
    );
  });

  it('by removed@mail.com', async () => {
    const { body } = await h
      .requestBy(await h.getUser('removed@mail.com'))
      .get(h.path())
      .expect(200);
    expect(body).toEqual([]);
  });

  it('by white-status@mail.com', async () => {
    const { body } = await h
      .requestBy(await h.getUser('white-status@mail.com'))
      .get(h.path())
      .expect(200);
    expect(body).toEqual([]);
  });

  it('by admin@mail.com', async () => {
    await h
      .requestBy(await h.getUser('admin@mail.com'))
      .get(h.path())
      .expect(200)
      .expect([]);
  });

  it('by owner', async () => {
    await h
      .requestBy(await h.getUser('super-admin@mail.com'))
      .get(h.path())
      .expect(200)
      .expect([]);
  });
});
