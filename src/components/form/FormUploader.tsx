import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import type { InputFormData } from "../../types";
import type { UploadResponse } from "../../types/api";
import type { GenerateResult } from "../../types";
import { validateInputForm } from "../../utils/validation";
import { apiClient } from "../../utils/apiClient";
import LoadingSpinner from "../ui/LoadingSpinner";
import Input from "../ui/Input";
import Button from "../ui/Button";

const initialForm: InputFormData = {
  name: "",
  genre: "",
  expertise: "",
  text: "",
  audio: null,
  video: null,
  price: 0,
  salesPeriod: "limited",
};

const FormUploader: React.FC = () => {
  const [form, setForm] = useState<InputFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const router = useRouter();

  const generateMutation = useMutation({
    mutationFn: (
      payload: Omit<
        InputFormData & { audioPath: string | null; videoPath: string | null },
        "audio" | "video"
      >
    ) =>
      apiClient<GenerateResult>("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      localStorage.setItem("autowebinar_result", JSON.stringify(data));
      router.push("/result");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;
    setForm((prev) => ({ ...prev, [name]: files[0] }));
  };

  const validate = validateInputForm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setLoading(true);

    try {
      // アップロード処理（音声・動画ファイル）
      let audioPath = null;
      let videoPath = null;

      if (form.audio) {
        // 音声ファイルのアップロード処理
        const formData = new FormData();
        formData.append("file", form.audio);
        formData.append("type", "audio");
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "/api/upload");
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              setUploadProgress(Math.round((e.loaded / e.total) * 100));
            }
          };
          xhr.onload = () => {
            if (xhr.status === 200) {
              const uploadResult = JSON.parse(
                xhr.responseText
              ) as UploadResponse;
              audioPath = uploadResult.filePath;
              setUploadProgress(null);
              resolve();
            } else {
              setUploadProgress(null);
              reject(new Error("音声ファイルのアップロードに失敗しました"));
            }
          };
          xhr.onerror = () => {
            setUploadProgress(null);
            reject(new Error("音声ファイルのアップロードに失敗しました"));
          };
          xhr.send(formData);
        });
      }

      if (form.video) {
        // 動画ファイルのアップロード処理
        const formData = new FormData();
        formData.append("file", form.video);
        formData.append("type", "video");
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "/api/upload");
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              setUploadProgress(Math.round((e.loaded / e.total) * 100));
            }
          };
          xhr.onload = () => {
            if (xhr.status === 200) {
              const uploadResult = JSON.parse(
                xhr.responseText
              ) as UploadResponse;
              videoPath = uploadResult.filePath;
              setUploadProgress(null);
              resolve();
            } else {
              setUploadProgress(null);
              reject(new Error("動画ファイルのアップロードに失敗しました"));
            }
          };
          xhr.onerror = () => {
            setUploadProgress(null);
            reject(new Error("動画ファイルのアップロードに失敗しました"));
          };
          xhr.send(formData);
        });
      }

      // 生成API呼び出し
      const payload = {
        name: form.name,
        genre: form.genre,
        expertise: form.expertise,
        text: form.text,
        price: form.price,
        salesPeriod: form.salesPeriod,
        audioPath,
        videoPath,
      };

      await generateMutation.mutateAsync(payload);
    } catch (err) {
      console.error(err);
      setErrors({
        submit:
          err instanceof Error ? err.message : "予期せぬエラーが発生しました",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="データを処理中..." />;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto p-8 bg-white rounded-apple shadow-apple"
    >
      {uploadProgress !== null && (
        <div className="w-full bg-apple-gray-100 rounded-pill h-3 mb-2 overflow-hidden">
          <div
            className="bg-apple-blue h-3 rounded-pill"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
      
      {errors.submit && (
        <div className="text-red-500 text-center bg-red-50 p-3 rounded-apple">
          {errors.submit}
        </div>
      )}
      
      <Input
        label="名前"
        name="name"
        value={form.name}
        onChange={handleChange}
        required={true}
        error={errors.name}
      />
      
      <Input
        label="ジャンル"
        name="genre"
        value={form.genre}
        onChange={handleChange}
        required={true}
        error={errors.genre}
      />
      
      <Input
        label="専門領域"
        name="expertise"
        value={form.expertise}
        onChange={handleChange}
        required={true}
        error={errors.expertise}
      />
      
      <div className="mb-4">
        <label className="block mb-1.5 text-apple-gray-500 font-medium">
          テキスト素材
        </label>
        <textarea
          name="text"
          value={form.text}
          onChange={handleChange}
          rows={3}
          className={`w-full px-4 py-3 rounded-apple border border-apple-gray-200 bg-white 
          focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10
          transition-all duration-200 ${errors.text ? "border-red-500" : ""}`}
        />
        {errors.text && <p className="mt-1 text-sm text-red-500">{errors.text}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block mb-1.5 text-apple-gray-500 font-medium">
          音声ファイル
        </label>
        <input
          type="file"
          name="audio"
          accept="audio/*"
          onChange={handleFileChange}
          className="w-full bg-white border border-apple-gray-200 rounded-apple p-2"
        />
        {form.audio && (
          <div className="mt-1 text-sm text-apple-gray-400">
            {form.audio.name}（{(form.audio.size / 1024 / 1024).toFixed(1)}MB）
          </div>
        )}
        {errors.audio && <p className="mt-1 text-sm text-red-500">{errors.audio}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block mb-1.5 text-apple-gray-500 font-medium">
          動画ファイル
        </label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleFileChange}
          className="w-full bg-white border border-apple-gray-200 rounded-apple p-2"
        />
        {form.video && (
          <div className="mt-1 text-sm text-apple-gray-400">
            {form.video.name}（{(form.video.size / 1024 / 1024).toFixed(1)}MB）
          </div>
        )}
        {errors.video && <p className="mt-1 text-sm text-red-500">{errors.video}</p>}
      </div>
      
      <Input
        label="希望商品価格（円）"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        required={true}
        error={errors.price}
      />
      
      <div className="mb-4">
        <label className="block mb-1.5 text-apple-gray-500 font-medium">
          販売期間
        </label>
        <select
          name="salesPeriod"
          value={form.salesPeriod}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-apple border border-apple-gray-200 bg-white
          focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10
          transition-all duration-200"
        >
          <option value="limited">期限あり</option>
          <option value="evergreen">エバーグリーン</option>
        </select>
      </div>
      
      <Button type="submit" variant="primary" fullWidth={true}>
        送信
      </Button>
    </form>
  );
};

export default FormUploader;