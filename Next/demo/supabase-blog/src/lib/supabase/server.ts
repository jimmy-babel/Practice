// // import { createServerClient } from '@supabase/ssr';
// // import { cookies } from 'next/headers';

// // export function createSupabaseServerClient() {
// //   const cookieStore = cookies(); // 获取 Next.js 的 cookie 存储

// //   return createServerClient(
// //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
// //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// //     {
// //       cookies: {
// //         // 批量获取所有 cookie（替代旧的 get）
// //         getAll() {
// //           return cookieStore.getAll();
// //         },
// //         // 批量设置所有 cookie（替代旧的 set 和 remove）
// //         setAll(cookiesToSet) {
// //           // 先删除所有需要移除的 cookie
// //           cookiesToSet.forEach(({ name, value, options }) => {
// //             if (value === null) {
// //               cookieStore.delete({ name, ...options });
// //             } else {
// //               cookieStore.set({ name, value, ...options });
// //             }
// //           });
// //         },
// //       },
// //       // 可选：指定 cookie 编码方式（默认是 'base64url'，无需修改）
// //       cookieEncoding: 'base64url',
// //     }
// //   );
// // }

// // 版本2
// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';
// import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
// // Next\demo\supabase-blog\node_modules\next\dist\server\web\spec-extension\adapters\request-cookies.d.ts
// // 导入 Next.js 内部的 cookie 类型（解决类型推断问题）
// // import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/cookies';

// export function createSupabaseServerClient() {
//   // 关键：cookies() 是同步方法，返回 ReadonlyRequestCookies（非 Promise）
//   // 显式声明类型，避免 TypeScript 误判为 Promise
//   const cookieStore = cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         // 批量获取所有 cookie：直接调用 cookieStore 的 getAll（同步方法）
//         getAll(): ReturnType<ReadonlyRequestCookies['getAll']> {
//           return cookieStore.set(); // 无 Promise，直接返回数组
//         },

//         // 批量设置/删除 cookie：遍历并调用同步方法
//         setAll(cookiesToSet: Array<{
//           name: string;
//           value: string | null;
//           options?: Parameters<ReadonlyRequestCookies['set']>[0];
//         }>) {
//           cookiesToSet.forEach(({ name, value, options = {} }) => {
//             if (value === null) {
//               // 删除 cookie：调用同步的 delete 方法
//               cookieStore.delete({ name, ...(options||{}) });
//             } else {
//               // 设置 cookie：调用同步的 set 方法
//               cookieStore.set({ name, value, ...(options||{}) });
//             }
//           });
//         },
//       },
//       cookieEncoding: 'base64url',
//     }
//   );
// }