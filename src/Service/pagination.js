export let pagination = async (skip, take) => {
  const results = await prisma.user.findMany({
    skip: 0 || skip,
    take: 10 || take,
  });
};
