from django.db import models

# from django.forms import ValidationError
# from django.template.loader import render_to_string
# from django.utils import timezone
from django.conf import settings
# from menus.models import Menu
from app.utils import slugify_rus, remove_empty_dirs
# from app.models import OrderedModel
from django.core.paginator import Paginator
# from django.apps import apps
# from . import app_settings as content_settings
import datetime
import os
import uuid
# from taggit.managers import TaggableManager
# from taggit.models import TagBase, GenericTaggedItemBase, TaggedItemBase

class ContentManager(models.Manager):

    def published(self):
        return self.filter(published=True, published_at__lte=datetime.date.today())# Create your models here
        

class ContentBase(models.Model):

    # menu = models.ForeignKey(
    #     'menus.Menu', on_delete=models.SET_NULL, verbose_name="Привязка к меню", blank=True, null=True)
    title = models.CharField(
        default="", max_length=1000, verbose_name="Заголовок")
    alias = models.SlugField(default="", blank=True, unique=True,
                             max_length=1000, help_text="Краткое название транслитом через тире (пример: 'kratkoe-nazvanie-translitom'). Чем короче тем лучше. Для автоматического заполнения - оставьте пустым.")
    published = models.BooleanField(default=True, verbose_name='Опубликовано')
    published_at = models.DateField(default=datetime.date.today, 
                                    verbose_name="Дата публикации")
    # created_at = models.DateTimeField(default=timezone.now,
    #                                 verbose_name="Дата создания")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Последнее изменение")
    hits = models.PositiveIntegerField(default=0, verbose_name="Кол-во просмотров")

    objects = ContentManager()

    def save(self, lock_recursion=False, *args, **kwargs):
        # только при создании объекта, id еще не существует
        if not self.id or not self.alias:
            # заполняем алиас
            self.alias = slugify_rus(self.title)

        super(ContentBase, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.title

    class Meta:
        abstract = True
        ordering = ['-published_at']


class Feed(ContentBase):

    # menu = models.ForeignKey('menus.Menu', on_delete=models.SET_NULL, verbose_name="Привязка к меню", null=True)
    parent = models.ForeignKey(
        'Feed', on_delete=models.CASCADE, blank=True, null=True, verbose_name="Родительская лента")
    include_childs = models.BooleanField(default=True, verbose_name="Отображать посты из дочерних лент")
    description = models.TextField(blank=True, null=True)

    def get_child_feeds(self):
        return Feed.objects.published().filter(parent=self)

    # def get_posts(self, post_filter):
    #     # запрашиваем посты в зависимости от опции показа дочерних лент
    #     if self.include_childs:
    #         qs = Post.objects.published().filter(
    #             models.Q(feed__in=self.get_child_feeds())
    #             |
    #             models.Q(feed=self)
    #         )
    #     else:
    #         qs = self.post_set.published()

    #     # если фильтр задан - применяем
    #     if post_filter:
    #         if post_filter.get('date_start', None):
    #             qs = qs.filter(published_at__gte=post_filter['date_start'])
    #         if post_filter.get('date_end', None):
    #             qs = qs.filter(published_at__lte=post_filter['date_end'])
    #         if post_filter.get('tag', None):
    #             qs = qs.filter(taggedpost__tag_id=post_filter['tag']) #| models.Q(text__icontains=q))
    #         # if post_filter.get('q', None):
    #         #     qs = qs.filter(models.Q(title__icontains=post_filter['q'])) #| models.Q(text__icontains=q))

    #     return qs
    
    def get_page(self, page=None, post_filter=None, posts_per_page=content_settings.NUM_POSTS_ON_FEED_PAGE):
        paginator = Paginator(
            # self.post_set.published().all(), posts_per_page
            self.get_posts(post_filter=post_filter), posts_per_page
        )
        return paginator.get_page(page)
    
    # def render_html(self, request):
    #     from .forms import FeedFilterForm # circular import
        
    #     return render_to_string(
    #             'content/layout_feed.html', 
    #             {
    #                 'feed':self, 
    #                 'posts':self.get_page(request, posts_per_page=self.feed_count_items),
    #                 'feed_style':self.feed_style,
    #                 'columns': self.feed_num_columns,
    #                 'count_items': self.feed_count_items,
    #                 'sort_direction': self.feed_sort_direction,
    #                 'readmore': self.feed_readmore,
    #                 'feed_filter_form' : FeedFilterForm
    #             })

    class Meta:
        verbose_name = "Лента постов"
        verbose_name_plural = "Ленты постов"


class Post(ContentBase, PostLayout):

    feed = models.ForeignKey(
        Feed, on_delete=models.SET_NULL, verbose_name="Лента постов", blank=True, null=True)
    # feed = models.ManyToManyField(Feed, blank=True, verbose_name="Лента")
    image = models.ImageField(upload_to="uploads/%Y/%m/%d/", verbose_name="Изображение поста",
        blank=True, null=True)
    IMAGE_POSITION_CHOICES = [
        ('left', 'Слева'),
        ('stretch', 'Растянуть'),
        ('right', 'Справа'),
        ('hide', 'Скрыть'),
    ]
    image_position = models.CharField(max_length=64, choices=IMAGE_POSITION_CHOICES, default=IMAGE_POSITION_CHOICES[0][0],
        verbose_name="Расположение изображения")
    tags = TaggableManager(through=TaggedPost)
    # tags = TaggableManager()
    intro_text = RichTextField(blank=True)
    text = RichTextUploadingField()
    
    def save(self, *args, **kwargs):

        intro = self.text.split('</p>')
        if len(intro) >= 2:
            self.intro_text = intro[0] + '</p>' + intro[1] + '</p>'
        else:
            self.intro_text = '<p></p>'

        super(Post, self).save(*args, **kwargs)
    
    def get_tags(self):
        return self.tags.all()

    def get_url(self):
        if self.feed and self.feed.menu:
            return self.feed.menu.url + self.alias
    def count_attachments(self):
        '''Возвращает количество связанных attachments'''
        return self.attachment_set.all().count()

    def get_attachments(self, *args, **kwargs):
        '''Возвращает все связанные объекты attachments'''
        return self.attachment_set.all()

    def relocate_attachments(self, *args, **kwargs):
        '''Обновляет расположение вложений, связанных с постом'''
        attachments = self.attachment_set.all()

        for attachment in attachments:
            attachment.update_location()
        
        return len(attachments)

    # def render_html(self, request):
    #     # для поста пока макет только один, поэтому все просто:
    #     return render_to_string(
    #             'content/layout_post.html', 
    #             {'post':self, 'attachments':self.get_attachments()}
    #             )

    class Meta:
        verbose_name = "Пост"
        verbose_name_plural = "Посты"
        ordering = ['-published_at']