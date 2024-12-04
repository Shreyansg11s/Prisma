const createCategory = async (data) => {
  const { name, tasks } = data;

  await prisma.category.create({
    data: {
      name: name,
      tasks: tasks,
    },
  });
};

export const getCategory = async () => {
  data = await prisma.category.findMany({});
  return data;
};

export default createCategory;
