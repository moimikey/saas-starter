// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import { Partial } from '$fresh/runtime.ts';
import { defineRoute } from '$fresh/server.ts';
import Head from '@/components/Head.tsx';
import TabsBar from '@/components/TabsBar.tsx';
import Chart from '@/islands/Chart.tsx';

function randomNumbers(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 1000));
}

export default defineRoute((_req, ctx) => {
  const labels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const datasets = [
    {
      label: 'Site visits',
      data: randomNumbers(labels.length),
      borderColor: '#be185d',
    },
    {
      label: 'Users created',
      data: randomNumbers(labels.length),
      borderColor: '#e85d04',
    },
    {
      label: 'Items created',
      data: randomNumbers(labels.length),
      borderColor: '#219ebc',
    },
    {
      label: 'Votes',
      data: randomNumbers(labels.length),
      borderColor: '#4338ca',
    },
  ];

  return (
    <>
      <Head title='Dashboard' href={ctx.url.href} />
      <main class='flex flex-col justify-center w-full max-w-5xl p-0 mx-auto my-0'>
        <div class='mb-8 text-center'>
          <h1 class='heading-styles'>Dashboard</h1>
          <p class='text-gray-500'>Community Stats</p>
        </div>
        <div class='flex flex-col md:flex-col gap-4'>
          <TabsBar
            links={[{
              path: '/dashboard/stats',
              innerText: 'Stats',
            }, {
              path: '/dashboard/users',
              innerText: 'Users',
            }]}
            currentPath={ctx.url.pathname}
          />
          <Partial name='stats'>
            <div class='relative flex-1'>
              <Chart
                type='line'
                options={{
                  maintainAspectRatio: false,
                  interaction: {
                    intersect: false,
                    mode: 'index',
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                    },
                    y: {
                      beginAtZero: true,
                      grid: { display: false },
                      ticks: { precision: 0 },
                    },
                  },
                }}
                data={{
                  labels,
                  datasets: datasets.map((dataset) => ({
                    ...dataset,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                  })),
                }}
              />
            </div>
          </Partial>
        </div>
      </main>
    </>
  );
});
